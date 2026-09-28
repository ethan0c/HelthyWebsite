"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import Segmented from "@/components/ui/Segmented";
import {
  ACTIVITY_LEVELS,
  LB_PER_KG,
  bmr,
  calorieTarget,
  macros,
  oneRepMax,
  proteinGrams,
  tdee,
  type ActivityKey,
  type Goal,
  type MacroStyle,
  type Sex,
} from "@/lib/calc";

/**
 * Interactive calculators for the /tools pages. Everything is computed
 * locally from the formulas in lib/calc.ts; nothing is sent anywhere.
 */

type Units = "imperial" | "metric";

const round = (n: number) => Math.round(n).toLocaleString("en-US");

// ── Inputs ────────────────────────────────────────────────────────

const labelCls = "mb-2 block text-[14px] text-fg-muted";

function Field({ label, hint, children }: { label: string; hint?: string; children: (id: string) => ReactNode }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {hint && <span className="ml-1 text-fg-subtle">{hint}</span>}
      </label>
      {children(id)}
    </div>
  );
}

function NumberInput({
  id,
  value,
  onChange,
  suffix,
  min = 0,
  max,
  step = 1,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input ${suffix ? "pr-12!" : ""}`}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-fg-subtle">
          {suffix}
        </span>
      )}
    </div>
  );
}

function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className={labelCls} aria-hidden="true">
        {label}
      </p>
      <Segmented
        label={label}
        value={value}
        onChange={onChange}
        options={options}
        className={`w-full ${options.length > 2 ? "[&>button]:px-2!" : ""}`}
      />
    </div>
  );
}

function Select<T extends string>({
  id,
  value,
  options,
  onChange,
}: {
  id: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="input cursor-pointer appearance-none truncate pr-11!"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface text-fg">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle"
      />
    </div>
  );
}

// ── Layout ────────────────────────────────────────────────────────

function Shell({ form, result }: { form: ReactNode; result: ReactNode }) {
  return (
    <div className="card grid overflow-hidden md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-5 p-6 md:p-8">{form}</div>
      <div aria-live="polite" className="border-t border-line bg-surface-2 p-6 md:border-l md:border-t-0 md:p-8">
        {result}
      </div>
    </div>
  );
}

function Stat({ label, value, unit, big }: { label: string; value: string; unit?: string; big?: boolean }) {
  return (
    <div>
      <p className="text-[14px] text-fg-muted">{label}</p>
      <p className={`mt-1 text-numeric text-fg ${big ? "text-[44px] leading-none" : "text-[26px]"}`}>
        {value}
        {unit && <span className="ml-1.5 font-body text-[14px] text-fg-subtle">{unit}</span>}
      </p>
    </div>
  );
}

function Empty() {
  return <p className="text-[15px] leading-6 text-fg-muted">Fill in your details to see your numbers.</p>;
}

// ── Shared body inputs ───────────────────────────────────────────

function useBody() {
  const [units, setUnits] = useState<Units>("imperial");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState(units === "imperial" ? "180" : "82");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("10");
  const [cm, setCm] = useState("178");
  const [bodyFat, setBodyFat] = useState("");
  const [activity, setActivity] = useState<ActivityKey>("moderate");

  const w = parseFloat(weight);
  const weightKg = units === "imperial" ? w / LB_PER_KG : w;
  const heightCm =
    units === "imperial" ? (parseFloat(ft) * 12 + (parseFloat(inch) || 0)) * 2.54 : parseFloat(cm);
  const ageN = parseFloat(age);
  const valid = weightKg > 20 && heightCm > 100 && ageN >= 13 && ageN <= 100;

  const switchUnits = (u: Units) => {
    if (u === units) return;
    if (w) setWeight(String(Math.round(u === "metric" ? w / LB_PER_KG : w * LB_PER_KG)));
    if (u === "metric" && heightCm) setCm(String(Math.round(heightCm)));
    if (u === "imperial" && heightCm) {
      const totalIn = Math.round(heightCm / 2.54);
      setFt(String(Math.floor(totalIn / 12)));
      setInch(String(totalIn % 12));
    }
    setUnits(u);
  };

  const fields = ({ withHeight = true, withActivity = true, withBodyFat = true } = {}) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Toggle
          label="Units"
          value={units}
          onChange={switchUnits}
          options={[
            { value: "imperial", label: "lb / ft" },
            { value: "metric", label: "kg / cm" },
          ]}
        />
        <Toggle
          label="Sex"
          value={sex}
          onChange={setSex}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Age">{(id) => <NumberInput id={id} value={age} onChange={setAge} suffix="yrs" />}</Field>
        <Field label="Weight">
          {(id) => (
            <NumberInput id={id} value={weight} onChange={setWeight} suffix={units === "imperial" ? "lb" : "kg"} />
          )}
        </Field>
      </div>
      {withHeight &&
        (units === "imperial" ? (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Height">{(id) => <NumberInput id={id} value={ft} onChange={setFt} suffix="ft" />}</Field>
            <Field label="&nbsp;">
              {(id) => <NumberInput id={id} value={inch} onChange={setInch} suffix="in" max={11} />}
            </Field>
          </div>
        ) : (
          <Field label="Height">{(id) => <NumberInput id={id} value={cm} onChange={setCm} suffix="cm" />}</Field>
        ))}
      {withActivity && (
        <Field label="Activity level">
          {(id) => (
            <Select
              id={id}
              value={activity}
              onChange={setActivity}
              options={ACTIVITY_LEVELS.map((a) => ({ value: a.key, label: a.label }))}
            />
          )}
        </Field>
      )}
      {withBodyFat && (
        <Field label="Body fat" hint="(optional, improves accuracy)">
          {(id) => <NumberInput id={id} value={bodyFat} onChange={setBodyFat} suffix="%" />}
        </Field>
      )}
    </>
  );

  const bmrResult = valid
    ? bmr({ sex, weightKg, heightCm, age: ageN, bodyFatPct: parseFloat(bodyFat) || undefined })
    : null;

  return { units, sex, weightKg, valid, activity, bmrResult, fields };
}

const GOAL_OPTIONS: { value: Goal; label: string }[] = [
  { value: "lose", label: "Lose fat" },
  { value: "maintain", label: "Maintain" },
  { value: "gain", label: "Build muscle" },
];

// ── Calculators ──────────────────────────────────────────────────

export function TdeeCalculator() {
  const body = useBody();
  const b = body.bmrResult;
  const t = b ? tdee(b.kcal, body.activity) : 0;

  return (
    <Shell
      form={body.fields()}
      result={
        b ? (
          <div className="space-y-6">
            <Stat label="Your TDEE" value={round(t)} unit="kcal / day" big />
            <Stat label={`BMR (${b.formula})`} value={round(b.kcal)} unit="kcal / day" />
            <div className="divide-y divide-line border-t border-line text-[15px]">
              {GOAL_OPTIONS.map((g) => (
                <div key={g.value} className="flex justify-between py-3 text-fg-muted last:pb-0">
                  <span>{g.label}</span>
                  <span className="text-numeric text-fg">
                    {round(calorieTarget(t, g.value, body.sex))}
                    <span className="ml-1 font-body text-fg-subtle">kcal</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Empty />
        )
      }
    />
  );
}

export function MacroCalculator() {
  const body = useBody();
  const [goal, setGoal] = useState<Goal>("lose");
  const [style, setStyle] = useState<MacroStyle>("balanced");
  const b = body.bmrResult;
  const calories = b ? calorieTarget(tdee(b.kcal, body.activity), goal, body.sex) : 0;
  const m = b ? macros({ calories, weightKg: body.weightKg, goal, sex: body.sex, style }) : null;

  return (
    <Shell
      form={
        <>
          {body.fields()}
          <Toggle label="Goal" value={goal} onChange={setGoal} options={GOAL_OPTIONS} />
          <Toggle
            label="Macro style"
            value={style}
            onChange={setStyle}
            options={[
              { value: "balanced", label: "Balanced" },
              { value: "low-carb", label: "Low carb" },
              { value: "high-protein", label: "High protein" },
            ]}
          />
        </>
      }
      result={
        m ? (
          <div className="space-y-6">
            <Stat label="Daily calories" value={round(calories)} unit="kcal" big />
            <div className="grid grid-cols-3 gap-4 border-t border-line pt-5">
              <Stat label="Protein" value={round(m.protein)} unit="g" />
              <Stat label="Carbs" value={round(m.carbs)} unit="g" />
              <Stat label="Fat" value={round(m.fat)} unit="g" />
            </div>
            <MacroBar p={m.protein * 4} c={m.carbs * 4} f={m.fat * 9} />
          </div>
        ) : (
          <Empty />
        )
      }
    />
  );
}

function MacroBar({ p, c, f }: { p: number; c: number; f: number }) {
  const total = p + c + f;
  const parts = [
    { label: "Protein", kcal: p, color: "var(--helthy-protein)" },
    { label: "Carbs", kcal: c, color: "var(--helthy-carbs)" },
    { label: "Fat", kcal: f, color: "var(--helthy-fats)" },
  ];
  return (
    <div>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-3">
        {parts.map((x) => (
          <div key={x.label} style={{ width: `${(x.kcal / total) * 100}%`, background: x.color }} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-fg-muted">
        {parts.map((x) => (
          <span key={x.label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: x.color }} />
            {x.label} {Math.round((x.kcal / total) * 100)}%
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProteinCalculator() {
  const body = useBody();
  const [goal, setGoal] = useState<Goal>("gain");
  const [meals, setMeals] = useState("4");
  const grams = body.weightKg > 20 ? proteinGrams(body.weightKg, goal) : 0;
  const perMeal = grams / Math.max(parseInt(meals) || 1, 1);

  return (
    <Shell
      form={
        <>
          {body.fields({ withHeight: false, withActivity: false, withBodyFat: false })}
          <Toggle label="Goal" value={goal} onChange={setGoal} options={GOAL_OPTIONS} />
          <Field label="Meals per day">
            {(id) => <NumberInput id={id} value={meals} onChange={setMeals} min={1} max={8} />}
          </Field>
        </>
      }
      result={
        grams ? (
          <div className="space-y-6">
            <Stat label="Protein per day" value={round(grams)} unit="g" big />
            <Stat label="Per meal" value={round(perMeal)} unit="g" />
            <p className="border-t border-line pt-5 text-[14px] leading-6 text-fg-muted">
              That&apos;s {(grams / body.weightKg).toFixed(1)} g per kg of bodyweight (
              {(grams / (body.weightKg * LB_PER_KG)).toFixed(2)} g per lb).
            </p>
          </div>
        ) : (
          <Empty />
        )
      }
    />
  );
}

export function OneRepMaxCalculator() {
  const [units, setUnits] = useState<Units>("imperial");
  const [weight, setWeight] = useState("185");
  const [reps, setReps] = useState("5");
  const w = parseFloat(weight);
  const r = parseInt(reps);
  const valid = w > 0 && r >= 1 && r <= 20;
  const max = valid ? oneRepMax(w, r) : 0;
  const unit = units === "imperial" ? "lb" : "kg";

  return (
    <Shell
      form={
        <>
          <Toggle
            label="Units"
            value={units}
            onChange={setUnits}
            options={[
              { value: "imperial", label: "lb" },
              { value: "metric", label: "kg" },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Weight lifted">
              {(id) => <NumberInput id={id} value={weight} onChange={setWeight} suffix={unit} step={2.5} />}
            </Field>
            <Field label="Reps completed">
              {(id) => <NumberInput id={id} value={reps} onChange={setReps} min={1} max={20} />}
            </Field>
          </div>
          {r > 12 && (
            <p className="text-[14px] leading-6 text-fg-subtle">
              Estimates get less reliable above 12 reps. For a better number, use a heavier set of 3–8.
            </p>
          )}
        </>
      }
      result={
        valid ? (
          <div className="space-y-6">
            <Stat label="Estimated 1RM" value={round(max)} unit={unit} big />
            <table className="w-full border-t border-line text-[15px]">
              <caption className="sr-only">Training weights as a percentage of your one-rep max</caption>
              <tbody className="divide-y divide-line">
                {[95, 90, 85, 80, 75, 70, 60].map((pct) => (
                  <tr key={pct} className="text-fg-muted">
                    <th scope="row" className="py-2.5 text-left font-normal">
                      {pct}%
                    </th>
                    <td className="py-2.5 text-right text-numeric text-fg">
                      {round((max * pct) / 100)}
                      <span className="ml-1 font-body text-fg-subtle">{unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty />
        )
      }
    />
  );
}
