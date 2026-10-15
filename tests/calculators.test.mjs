import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = ts.transpileModule(readFileSync(new URL('../lib/calc.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { bmr, tdee, calorieTarget, proteinGrams, macros, bodyInputError, mealCountError, LB_PER_KG } =
  await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const adult = { sex: 'male', weightKg: 80, heightCm: 180, age: 30 };
test('known Mifflin estimates and activity totals', () => {
  assert.equal(bmr(adult).kcal, 1780);
  assert.equal(bmr({ ...adult, sex: 'female' }).kcal, 1614);
  assert.equal(tdee(1780, 'moderate'), 2759);
  assert.equal(tdee(1780, 'sedentary'), 2136);
});
test('optional body fat changes the formula only when provided', () => {
  assert.equal(bmr(adult).formula, 'Mifflin-St Jeor');
  assert.equal(bmr({ ...adult, bodyFatPct: 20 }).formula, 'Katch-McArdle');
  assert.equal(bmr({ ...adult, bodyFatPct: 20 }).kcal, 1752.4);
});
test('goal targets preserve maintenance, modest surplus and intake limits', () => {
  assert.equal(calorieTarget(2759, 'maintain', 'male'), 2759);
  assert.equal(calorieTarget(2759, 'lose', 'male'), 2259);
  assert.equal(Math.round(calorieTarget(2759, 'gain', 'male')), 3035);
  assert.equal(calorieTarget(1600, 'lose', 'male'), 1500);
  assert.equal(calorieTarget(1300, 'lose', 'female'), 1200);
});
test('adult estimates reject missing, nonfinite and out-of-range values', () => {
  assert.equal(bodyInputError(adult), null);
  for (const patch of [{ weightKg: NaN }, { weightKg: Infinity }, { weightKg: 0 }, { weightKg: 501 }, { heightCm: NaN }, { heightCm: 251 }, { age: 17 }, { age: 101 }, { age: 30.5 }, { bodyFatPct: 0 }, { bodyFatPct: 70 }, { bodyFatPct: NaN }])
    assert.ok(bodyInputError({ ...adult, ...patch }), JSON.stringify(patch));
  assert.equal(bodyInputError({ ...adult, age: 18, bodyFatPct: 20 }), null);
});
test('protein does not depend on hidden height, age or sex fields', () => {
  assert.equal(bodyInputError({ weightKg: 80 }), null);
  assert.equal(Math.round(proteinGrams(180 / LB_PER_KG, 'gain')), 144);
  assert.equal(Math.round(proteinGrams(180 / LB_PER_KG, 'lose')), 153);
});
test('meal counts reject zero, negatives, fractions, empty and huge values', () => {
  for (const meals of [0, -1, 1.5, 9, NaN, Infinity]) assert.ok(mealCountError(meals));
  for (const meals of [1, 4, 8]) assert.equal(mealCountError(meals), null);
});
test('macro calorie totals agree with the displayed target', () => {
  for (const style of ['balanced', 'low-carb', 'high-protein']) {
    const m = macros({ calories: 2259, weightKg: 80, goal: 'lose', sex: 'male', style });
    assert.ok(m);
    assert.ok(Math.abs(m.protein * 4 + m.carbs * 4 + m.fat * 9 - 2259) < 0.001);
  }
});
test('infeasible macro budgets produce no misleading breakdown', () => {
  assert.equal(macros({ calories: 1200, weightKg: 200, goal: 'lose', sex: 'female', style: 'balanced' }), null);
});
