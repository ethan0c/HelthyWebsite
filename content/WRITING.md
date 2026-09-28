# Writing guide for articles

Applies to blog posts (`content/blog/*.mdx`) and exercise guides (`content/exercises/*.mdx`).
Read it before writing or editing either. The rules come from studying 26 bylined articles at
publications like Stronger by Science, MacroFactor, StrengthLog, Nerd Fitness, BarBend and
Precision Nutrition. The goal is for every article to read like an experienced coach wrote it,
not a content tool.

## Who is writing

"The Helthy team": people who train, track their food and have walked friends through their
first year in the gym. Write like that person explaining something between sets: direct,
specific, a bit opinionated, never salesy.

- Second person for the reader. "We" for the team's view ("we'd start with dumbbells").
- Contractions everywhere: you're, don't, it's, won't.
- **At least two opinions per article that a reader could disagree with, each with a reason.**
  "Most people should skip the Smith machine version, because..." beats "both have benefits".
- **At least one honest caveat or admission**: "this matters less than people think", "the
  evidence here is thin", "there's real debate about this, but...".
- Give permission where a coach would: "it's fine if the plates touch the floor between reps".
- Admit individual variation, then still give a default: "try a slightly wider and narrower
  stance and keep whichever feels strongest; most people land around shoulder width".
- **Never invent anecdotes, clients, credentials, personal lifts or quotes.** Use the coaching
  "we" and describe what lifters commonly do ("the usual culprit is..."). That's honest and it
  still sounds human.

## Openers

- Open on one of: the reader's question in their own words, a common belief you're about to
  test, a specific number, or (for exercise guides) what the lift is for and who should do it.
- Get to the answer or the instructions on the first screen: under 120 words of intro for an
  exercise guide, under 200 for a blog post.
- Never open with scene-setting, a definition ("The squat is a compound exercise that..."),
  "Whether you're a beginner or...", or a promise ("In this guide, we'll cover...").

## Structure and formatting

- **Headings:** literal and searchable at H2 ("How to do a Romanian deadlift", "How much
  protein do you need?"). Concrete at H3: the actual fault, the actual question. A blog post can
  have one or two headings with some voice ("What this means for your next cut").
- **Uneven on purpose.** Sections, lists and paragraphs should vary in length. Spend words where
  readers get stuck. Drop a section that has nothing specific to say instead of padding it.
- **Don't force counts.** Use the number of steps, cues or mistakes the topic actually has. Four
  mistakes is fine; so is seven. Don't reach for three by habit.
- **Lists** for steps, cues, mistakes and sets/reps. **Prose** for explanations, the "why" and
  opinions. Blog posts should be at least half prose.
- **Bold lead-ins** only where scanning helps (mistake names, step actions, goal blocks). Never
  bold a lead-in and then repeat it in the next sentence.
- **Tables** for numbers people compare (weights by level, calories, week-by-week progressions).
- **Paragraphs** of one to four sentences, with some one-liners for rhythm.
- **No summary boxes** and no "Conclusion" or "The takeaway" section that restates the article.

## Sentences

- Mix very short sentences (fragments are fine) with longer ones that walk through cause and
  effect. No run of three paragraphs with the same shape.
- Specifics instead of adjectives: numbers, positions, landmarks, what it feels like. "Stop when
  the bar reaches mid-shin" beats "lower in a controlled manner".
- One everyday analogy per article where it genuinely clarifies something (a bar drifting away
  from you feels heavier, like holding a laundry basket at arm's length).
- Parenthetical asides are welcome (they're a big part of what makes prose sound spoken).
- Em dashes: about one per 300 words at most, and never as a dramatic pivot. Use a comma,
  brackets, a colon or a full stop.
- Plain words: "use" not "utilize", "help" not "facilitate".
- American spelling (color, organize, center, gray), to match the site's lb and US dollars.
- Digits for measurements and counts (3 sets of 8, 135 lb). Give lb and kg for weights the
  first time they appear.

## Evidence

- When you cite research, say something concrete: who was studied, for how long, what was
  compared, what happened, and one limit. Otherwise leave the citation out. Never write "studies
  show" with nothing after it.
- Hedge only claims that are genuinely uncertain, say why, then commit to a default. No more than
  one "may" or "can help" per paragraph.
- Never invent statistics or studies. If you name a study, organization or researcher, you must
  be confident it exists and says what you claim.

## Safety

- Mention seeing a professional once, where it applies, with the trigger: "if it still hurts after
  a week of lighter loads, get it looked at". Never as boilerplate or a closing line.
- Be clear about effort versus pain, and when to stop a set.

## Mentioning Helthy

- No app mentions in the instructions or the opening. At most one or two in the body, only where
  the app is the practical answer (logging sets so you can beat last week, seeing your weight
  trend). The page adds its own download banner, so finish the advice and stop; never end on a
  pitch.
- Only claim features that exist: check `helthy_app/backend/src/ai/prompts/appKnowledge.ts`.
- Follow the copy rules in AGENTS.md: never name AI providers, models, data sources or internals.
- Link to our own pages where they help: calculators (`/tools/...`), exercise guides
  (`/exercises/<slug>`), blog posts (`/blog/<slug>`). Only link to pages that exist.

## Banned phrases

"In today's fast-paced world", "When it comes to", "Whether you're a beginner or a seasoned...",
"Let's dive in", "It's important to note", "It's worth mentioning", "Additionally",
"Furthermore", "Moreover", "In conclusion", "Ultimately", "At the end of the day", "Remember,"
(as a closer), "unlock", "elevate", "supercharge", "game-changer", "take your X to the next
level", "journey", "holistic", "crucial", "delve", "a testament to", "in a controlled manner"
(without a landmark), "improper form" (name the actual fault), "studies show" (without the
study), "consult a healthcare professional before starting any exercise program" (as
boilerplate), and "It's not X. It's Y." more than once.

## Blog posts

- 1,200–2,500 words. The title is written the way people search ("How Many Calories Should I Eat
  to Lose Weight?"). `description` is one or two plain sentences, about 150 characters.
- Give the short answer (a number, or yes/no with conditions) in the first 150 words.
- At least one worked example with real numbers (a 180 lb lifter's protein target in grams, a
  week-by-week progression table).
- End on a recommendation for a specific reader and when to deviate from it, or a one-line
  reframe, or just the last useful point.
- Copy `content/blog/_template.mdx` to start.

## Exercise guides

The facts (muscles, equipment, difficulty, strength ratios) live in `lib/content/exercises.ts`
and render above the article as an at-a-glance row, so don't restate them in prose. The MDX is the
article. Keep form cues consistent with the app's tips in
`helthy_app/backend/scripts/seed-exercise-tips.ts`: go deeper, never contradict.
`content/exercises/barbell-bench-press.mdx` is the reference; match its depth and voice.

- 900–1,800 words. `description` (under the title and in search results) says what the lift is
  good for or who it suits, in one or two plain sentences. Not "Learn how to...".
- Sections, in roughly this order. Rename, merge or drop them to suit the lift:
  1. **Opening** (no heading): what it's for and why you'd pick it over the obvious alternative.
  2. **How to do it**: 4–8 numbered steps, each starting with a verb, one to three sentences,
     lengths varying. Setup (stance, grip, brace, breath) comes before the movement. **Every
     movement step has a checkable landmark**: where the bar is, where to stop, what you
     should feel.
  3. **Form cues**: 3–6 short cues (3–8 words), mostly external or image-based ("push the floor
     away", "elbows to your back pockets"), each with a line on what it fixes. Offer them as
     alternatives ("if that doesn't click, try...").
  4. **Common mistakes**: 3–6, each headed with the visible fault in plain words ("Letting the
     bar drift forward"). One paragraph each: what it looks like, the usual cause, the fix.
  5. **Breathing and bracing**: only if it adds something beyond "breathe out on the way up".
  6. **Sets, reps and weight**: numbers by goal, how to pick the load ("a weight you could do 2–3
     more reps with"), where it fits in a session, a warm-up ramp for heavy compound lifts, and
     how to progress. Add `<StrengthTable />` here if the exercise has `ratios` in
     `exercises.ts` (it renders nothing otherwise, so leave it out).
  7. **Variations and alternatives**: variations change the tool or emphasis, alternatives are
     swaps for missing equipment or sore joints. One to three sentences each on when to use it,
     easiest to hardest where that makes sense. Link to our guides where they exist.
  8. **FAQ** (optional): two to four real questions people search ("Is the leg press as good as
     squats?") with short, direct answers.
- Describe what the lift feels like when it's right and when it's wrong: where you should feel
  it, and where you shouldn't.
