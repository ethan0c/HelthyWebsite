import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = ts.transpileModule(readFileSync(new URL('../lib/content/exercises.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { EXERCISES, getRelatedExercises } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('every exercise receives a related-guide link without self-links or duplicates', () => {
  const incoming = new Map(EXERCISES.map(e => [e.slug, 0]));
  for (const exercise of EXERCISES) {
    const related = getRelatedExercises(exercise);
    assert.ok(related.length > 0 && related.length <= 5);
    assert.equal(new Set(related.map(e => e.slug)).size, related.length);
    for (const target of related) {
      assert.notEqual(target.slug, exercise.slug);
      assert.equal(target.group, exercise.group);
      assert.ok(incoming.has(target.slug));
      incoming.set(target.slug, incoming.get(target.slug) + 1);
    }
  }
  for (const [slug, count] of incoming) assert.ok(count > 0, `${slug} needs an incoming related-guide link`);
});

test('related guides retain useful equipment and movement alternatives', () => {
  for (const [from, to] of [
    ['incline-barbell-bench-press', 'incline-dumbbell-press'],
    ['chest-fly', 'dumbbell-fly'],
    ['pull-up', 'lat-pulldown'],
    ['barbell-squat', 'front-squat'],
    ['romanian-deadlift', 'leg-curl'],
    ['deadlift', 'rack-pull'],
  ]) {
    assert.ok(getRelatedExercises(EXERCISES.find(e => e.slug === from)).some(e => e.slug === to), `${from} should link to ${to}`);
  }
});
