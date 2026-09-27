/**
 * Formulas behind the /tools calculators. BMR formulas, goal adjustments,
 * calorie floors, protein (policy v4) and the macro split mirror
 * helthy_app/backend/src/utils/nutrition.ts. The app builds TDEE from
 * components with real step and workout data; the web calculators use
 * standard activity multipliers instead.
 */

export type Sex = "male" | "female";
export type Goal = "lose" | "maintain" | "gain";
export type MacroStyle = "balanced" | "low-carb" | "high-protein";

export const LB_PER_KG = 2.20462;

export const ACTIVITY_LEVELS = [
  { key: "sedentary", label: "Sedentary (desk job, little exercise)", factor: 1.2 },
  { key: "light", label: "Light (exercise 1–3 days a week)", factor: 1.375 },
  { key: "moderate", label: "Moderate (exercise 3–5 days a week)", factor: 1.55 },
  { key: "active", label: "Very active (hard exercise 6–7 days)", factor: 1.725 },
  { key: "athlete", label: "Athlete (training twice a day)", factor: 1.9 },
] as const;

export type ActivityKey = (typeof ACTIVITY_LEVELS)[number]["key"];

/** Protein policy v4: 0.85 g/lb when cutting, 0.8 g/lb otherwise, no cap. */
const PROTEIN_G_PER_KG: Record<Goal, number> = {
  lose: 0.85 * LB_PER_KG,
  maintain: 0.8 * LB_PER_KG,
  gain: 0.8 * LB_PER_KG,
};
const HIGH_PROTEIN_BONUS_G_PER_KG = 0.3;

/** Share of the calories left after protein that goes to carbs; fat gets the rest. */
const CARB_SHARE: Record<MacroStyle, number> = { balanced: 0.55, "low-carb": 0.3, "high-protein": 0.5 };

export function bmr({
  sex,
  weightKg,
  heightCm,
  age,
  bodyFatPct,
}: {
  sex: Sex;
  weightKg: number;
  heightCm: number;
  age: number;
  bodyFatPct?: number;
}) {
  if (bodyFatPct && bodyFatPct > 2 && bodyFatPct < 70) {
    const leanKg = weightKg * (1 - bodyFatPct / 100);
    return { kcal: 370 + 21.6 * leanKg, formula: "Katch-McArdle" as const };
  }
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return { kcal: base + (sex === "male" ? 5 : -161), formula: "Mifflin-St Jeor" as const };
}

export function tdee(bmrKcal: number, activity: ActivityKey) {
  const level = ACTIVITY_LEVELS.find((a) => a.key === activity) ?? ACTIVITY_LEVELS[0];
  return bmrKcal * level.factor;
}

/** The app's default when no weekly rate is chosen: a 20% deficit up to 500 kcal, or a 10% surplus. */
export function calorieTarget(tdeeKcal: number, goal: Goal, sex: Sex) {
  if (goal === "maintain") return tdeeKcal;
  if (goal === "gain") return tdeeKcal + Math.min(tdeeKcal * 0.1, 1000);
  const floor = sex === "male" ? 1500 : 1200;
  return Math.max(tdeeKcal - Math.min(tdeeKcal * 0.2, 500), floor);
}

export function proteinGrams(weightKg: number, goal: Goal, style: MacroStyle = "balanced") {
  return weightKg * (PROTEIN_G_PER_KG[goal] + (style === "high-protein" ? HIGH_PROTEIN_BONUS_G_PER_KG : 0));
}

/** Protein from bodyweight first; the macro style splits what's left between carbs and fat. */
export function macros({
  calories,
  weightKg,
  goal,
  sex,
  style,
}: {
  calories: number;
  weightKg: number;
  goal: Goal;
  sex: Sex;
  style: MacroStyle;
}) {
  const protein = proteinGrams(weightKg, goal, style);
  const fatMin = sex === "male" ? 40 : 35;
  const carbFloor = 100;
  const remaining = calories - protein * 4;
  let carbs = (remaining * CARB_SHARE[style]) / 4;
  let fat = (remaining * (1 - CARB_SHARE[style])) / 9;
  if (fat < fatMin) {
    fat = fatMin;
    carbs = (calories - protein * 4 - fat * 9) / 4;
  }
  if (carbs < carbFloor) {
    carbs = carbFloor;
    fat = (calories - protein * 4 - carbs * 4) / 9;
  }
  return { protein, carbs: Math.max(carbs, carbFloor), fat: Math.max(fat, fatMin) };
}

/** Estimated one-rep max: mean of Epley and Brzycki. Reliable up to ~12 reps. */
export function oneRepMax(weight: number, reps: number) {
  if (reps <= 1) return weight;
  const epley = weight * (1 + reps / 30);
  const brzycki = (weight * 36) / (37 - reps);
  return (epley + brzycki) / 2;
}
