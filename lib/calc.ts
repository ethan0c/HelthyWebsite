/**
 * Formulas behind the /tools calculators. BMR formulas, protein targets,
 * the 7700 kcal/kg rule and calorie floors match the app (see "HOW HELTHY
 * CALCULATES" in helthy_app/backend/src/ai/prompts/appKnowledge.ts). The app
 * builds TDEE from components with real step and workout data; the web
 * calculators use standard activity multipliers instead.
 */

export type Sex = "male" | "female";
export type Goal = "lose" | "maintain" | "gain";
export type MacroStyle = "balanced" | "low-carb" | "high-protein";

export const LB_PER_KG = 2.20462;
export const KCAL_PER_KG = 7700;

export const ACTIVITY_LEVELS = [
  { key: "sedentary", label: "Sedentary (desk job, little exercise)", factor: 1.2 },
  { key: "light", label: "Light (exercise 1–3 days a week)", factor: 1.375 },
  { key: "moderate", label: "Moderate (exercise 3–5 days a week)", factor: 1.55 },
  { key: "active", label: "Very active (hard exercise 6–7 days)", factor: 1.725 },
  { key: "athlete", label: "Athlete (training twice a day)", factor: 1.9 },
] as const;

export type ActivityKey = (typeof ACTIVITY_LEVELS)[number]["key"];

/** Default weekly rate when a goal is picked, in kg per week. */
const GOAL_RATE_KG: Record<Goal, number> = { lose: -0.5, maintain: 0, gain: 0.25 };

const PROTEIN_G_PER_KG: Record<Goal, number> = { lose: 2.2, maintain: 1.8, gain: 2.0 };

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

export function calorieTarget(tdeeKcal: number, goal: Goal, sex: Sex) {
  const target = tdeeKcal + (GOAL_RATE_KG[goal] * KCAL_PER_KG) / 7;
  const floor = sex === "male" ? 1500 : 1200;
  return goal === "lose" ? Math.max(target, floor) : target;
}

export function proteinGrams(weightKg: number, goal: Goal, sex: Sex, style: MacroStyle = "balanced") {
  const perKg = PROTEIN_G_PER_KG[goal] + (style === "high-protein" ? 0.3 : 0);
  const cap = sex === "male" ? 220 : 170;
  return Math.min(weightKg * perKg, cap);
}

/** Protein from bodyweight, fat as a share of calories, carbs fill the rest. */
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
  const protein = proteinGrams(weightKg, goal, sex, style);
  const fatShare = style === "low-carb" ? 0.4 : 0.27;
  const minFat = weightKg * 0.6;
  const fat = Math.max((calories * fatShare) / 9, minFat);
  const carbs = Math.max((calories - protein * 4 - fat * 9) / 4, 50);
  return { protein, fat, carbs };
}

/** Estimated one-rep max: mean of Epley and Brzycki. Reliable up to ~12 reps. */
export function oneRepMax(weight: number, reps: number) {
  if (reps <= 1) return weight;
  const epley = weight * (1 + reps / 30);
  const brzycki = (weight * 36) / (37 - reps);
  return (epley + brzycki) / 2;
}
