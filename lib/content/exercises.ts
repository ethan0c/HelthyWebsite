/**
 * Exercise guides published at /exercises/[slug].
 *
 * Tips, common mistakes, breathing cues, difficulty and weight ratios are
 * copied from helthy_app/backend/scripts/seed-exercise-tips.ts so the site
 * says exactly what the app says. Keep them in sync when that file changes.
 * Muscle groups and equipment were added for the website.
 */

export type ExerciseGroup = "Chest" | "Back" | "Shoulders" | "Legs" | "Arms" | "Core";

export type Exercise = {
  slug: string;
  name: string;
  group: ExerciseGroup;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  tips: string;
  commonMistakes: string[];
  breathing: string;
  /** Working weight as a multiple of bodyweight (not a 1RM). */
  ratios?: { beginner: number; intermediate: number; advanced: number };
};

export const EXERCISE_GROUPS: ExerciseGroup[] = ["Chest", "Back", "Shoulders", "Legs", "Arms", "Core"];

export const EXERCISES: Exercise[] = [
  {
    slug: "barbell-bench-press",
    name: "Barbell Bench Press",
    group: "Chest",
    equipment: "Barbell",
    primaryMuscles: [
      "Chest"
    ],
    secondaryMuscles: [
      "Front delts",
      "Triceps"
    ],
    difficulty: "intermediate",
    tips: "Retract your shoulder blades and arch your upper back slightly to protect your shoulders. Drive your feet into the floor for stability. Grip the bar slightly wider than shoulder width.",
    commonMistakes: [
      "Flaring elbows out to 90 degrees — keep them at roughly 45-75 degrees",
      "Bouncing the bar off the chest",
      "Lifting hips off the bench",
      "Not using a full range of motion"
    ],
    breathing: "Inhale as you lower the bar to your chest. Exhale forcefully as you press the bar up.",
    ratios: {
      beginner: 0.35,
      intermediate: 0.65,
      advanced: 1
    }
  },
  {
    slug: "dumbbell-bench-press",
    name: "Dumbbell Bench Press",
    group: "Chest",
    equipment: "Dumbbells",
    primaryMuscles: [
      "Chest"
    ],
    secondaryMuscles: [
      "Front delts",
      "Triceps"
    ],
    difficulty: "beginner",
    tips: "Use a neutral or slight inward angle on the dumbbells. Start with the dumbbells at chest level with elbows at about 45 degrees. Squeeze at the top without locking out.",
    commonMistakes: [
      "Letting dumbbells drift too far forward or backward",
      "Not controlling the lowering phase",
      "Using momentum to swing the weights up"
    ],
    breathing: "Inhale as you lower the dumbbells. Exhale as you press up.",
    ratios: {
      beginner: 0.15,
      intermediate: 0.3,
      advanced: 0.45
    }
  },
  {
    slug: "incline-barbell-bench-press",
    name: "Incline Barbell Bench Press",
    group: "Chest",
    equipment: "Barbell",
    primaryMuscles: [
      "Upper chest"
    ],
    secondaryMuscles: [
      "Front delts",
      "Triceps"
    ],
    difficulty: "intermediate",
    tips: "Set the bench to 30-45 degrees. Use a slightly narrower grip than flat bench. Focus on pressing the bar toward the ceiling, not toward your face.",
    commonMistakes: [
      "Setting the incline too steep (turns into a shoulder press)",
      "Not touching the upper chest",
      "Excessive lower back arch"
    ],
    breathing: "Inhale on the way down. Exhale as you push up.",
    ratios: {
      beginner: 0.25,
      intermediate: 0.5,
      advanced: 0.8
    }
  },
  {
    slug: "push-up",
    name: "Push-Up",
    group: "Chest",
    equipment: "Bodyweight",
    primaryMuscles: [
      "Chest"
    ],
    secondaryMuscles: [
      "Front delts",
      "Triceps",
      "Core"
    ],
    difficulty: "beginner",
    tips: "Keep your body in a straight line from head to heels. Place hands slightly wider than shoulder-width. Engage your core throughout the movement.",
    commonMistakes: [
      "Sagging hips or piking the hips up",
      "Not going low enough — aim for chest near the floor",
      "Flaring elbows out too wide"
    ],
    breathing: "Inhale as you lower your body. Exhale as you push up."
  },
  {
    slug: "chest-fly",
    name: "Chest Fly",
    group: "Chest",
    equipment: "Machine",
    primaryMuscles: [
      "Chest"
    ],
    secondaryMuscles: [
      "Front delts"
    ],
    difficulty: "beginner",
    tips: "Keep a slight bend in your elbows throughout. Focus on squeezing your chest at the top. Lower the weights in a wide arc until you feel a stretch.",
    commonMistakes: [
      "Bending elbows too much (turns into a press)",
      "Going too deep and straining shoulders",
      "Using too heavy a weight"
    ],
    breathing: "Inhale as you open your arms. Exhale as you bring them together."
  },
  {
    slug: "cable-crossover",
    name: "Cable Crossover",
    group: "Chest",
    equipment: "Cable",
    primaryMuscles: [
      "Chest"
    ],
    secondaryMuscles: [
      "Front delts"
    ],
    difficulty: "beginner",
    tips: "Step forward slightly to create tension at the start. Keep a slight bend in elbows and cross your hands at the bottom for maximum contraction.",
    commonMistakes: [
      "Using too much body lean/momentum",
      "Not maintaining consistent elbow angle",
      "Rushing the eccentric phase"
    ],
    breathing: "Inhale as you open arms wide. Exhale as you bring hands together."
  },
  {
    slug: "barbell-row",
    name: "Barbell Row",
    group: "Back",
    equipment: "Barbell",
    primaryMuscles: [
      "Lats",
      "Upper back"
    ],
    secondaryMuscles: [
      "Biceps",
      "Rear delts",
      "Lower back"
    ],
    difficulty: "intermediate",
    tips: "Hinge at the hips to about 45 degrees. Pull the bar to your lower chest/upper abdomen. Squeeze your shoulder blades together at the top.",
    commonMistakes: [
      "Using too much body English/jerking the weight",
      "Rounding the lower back",
      "Not pulling to the right position (too high or too low)"
    ],
    breathing: "Inhale at the bottom. Exhale as you pull the bar up.",
    ratios: {
      beginner: 0.3,
      intermediate: 0.55,
      advanced: 0.85
    }
  },
  {
    slug: "pull-up",
    name: "Pull-Up",
    group: "Back",
    equipment: "Bodyweight",
    primaryMuscles: [
      "Lats"
    ],
    secondaryMuscles: [
      "Biceps",
      "Upper back",
      "Core"
    ],
    difficulty: "advanced",
    tips: "Start from a dead hang with shoulders engaged. Pull with your elbows, driving them down and back. Get your chin above the bar.",
    commonMistakes: [
      "Kipping or swinging the body",
      "Not going through full range of motion",
      "Shrugging shoulders up during the pull"
    ],
    breathing: "Inhale at the bottom of the hang. Exhale as you pull up."
  },
  {
    slug: "lat-pulldown",
    name: "Lat Pulldown",
    group: "Back",
    equipment: "Cable",
    primaryMuscles: [
      "Lats"
    ],
    secondaryMuscles: [
      "Biceps",
      "Upper back"
    ],
    difficulty: "beginner",
    tips: "Lean back slightly and pull the bar to your upper chest. Focus on driving elbows down and squeezing your lats. Use a grip just wider than shoulder width.",
    commonMistakes: [
      "Leaning too far back",
      "Pulling the bar behind the neck (injury risk)",
      "Using arms more than back"
    ],
    breathing: "Inhale at the top with arms extended. Exhale as you pull down.",
    ratios: {
      beginner: 0.35,
      intermediate: 0.6,
      advanced: 0.85
    }
  },
  {
    slug: "seated-cable-row",
    name: "Seated Cable Row",
    group: "Back",
    equipment: "Cable",
    primaryMuscles: [
      "Upper back",
      "Lats"
    ],
    secondaryMuscles: [
      "Biceps",
      "Rear delts"
    ],
    difficulty: "beginner",
    tips: "Sit upright with a slight forward lean at the start. Pull the handle to your lower chest, squeezing shoulder blades. Keep your torso stationary.",
    commonMistakes: [
      "Excessive body rocking back and forth",
      "Rounding the upper back",
      "Shrugging shoulders during the pull"
    ],
    breathing: "Inhale as you extend arms forward. Exhale as you pull toward your body.",
    ratios: {
      beginner: 0.3,
      intermediate: 0.55,
      advanced: 0.8
    }
  },
  {
    slug: "dumbbell-row",
    name: "Dumbbell Row",
    group: "Back",
    equipment: "Dumbbell",
    primaryMuscles: [
      "Lats",
      "Upper back"
    ],
    secondaryMuscles: [
      "Biceps",
      "Rear delts"
    ],
    difficulty: "beginner",
    tips: "Support yourself with one hand and knee on a bench. Keep your back flat and pull the dumbbell to your hip. Squeeze at the top for a full contraction.",
    commonMistakes: [
      "Rotating the torso to heave the weight up",
      "Not pulling high enough",
      "Rounding the back"
    ],
    breathing: "Inhale as you lower the dumbbell. Exhale as you row it up.",
    ratios: {
      beginner: 0.15,
      intermediate: 0.3,
      advanced: 0.45
    }
  },
  {
    slug: "deadlift",
    name: "Deadlift",
    group: "Back",
    equipment: "Barbell",
    primaryMuscles: [
      "Glutes",
      "Hamstrings",
      "Lower back"
    ],
    secondaryMuscles: [
      "Quads",
      "Traps",
      "Forearms"
    ],
    difficulty: "advanced",
    tips: "Stand with feet hip-width, bar over midfoot. Keep the bar close to your body throughout. Drive through your heels and lock out hips and knees together.",
    commonMistakes: [
      "Rounding the lower back",
      "Starting with hips too high or too low",
      "Letting the bar drift away from the body",
      "Hyperextending at the top"
    ],
    breathing: "Take a deep breath and brace your core before each rep. Exhale at the top of the lift.",
    ratios: {
      beginner: 0.5,
      intermediate: 1,
      advanced: 1.6
    }
  },
  {
    slug: "romanian-deadlift",
    name: "Romanian Deadlift",
    group: "Legs",
    equipment: "Barbell",
    primaryMuscles: [
      "Hamstrings",
      "Glutes"
    ],
    secondaryMuscles: [
      "Lower back",
      "Forearms"
    ],
    difficulty: "intermediate",
    tips: "Start standing with the bar. Push your hips back while keeping a slight knee bend. Lower until you feel a hamstring stretch, then drive hips forward to stand.",
    commonMistakes: [
      "Bending knees too much (turns into a squat)",
      "Rounding the back",
      "Not pushing hips back far enough"
    ],
    breathing: "Inhale as you hinge forward. Exhale as you drive hips forward to stand.",
    ratios: {
      beginner: 0.35,
      intermediate: 0.65,
      advanced: 1
    }
  },
  {
    slug: "overhead-press",
    name: "Overhead Press",
    group: "Shoulders",
    equipment: "Barbell",
    primaryMuscles: [
      "Front delts"
    ],
    secondaryMuscles: [
      "Side delts",
      "Triceps",
      "Upper chest"
    ],
    difficulty: "intermediate",
    tips: "Start with the bar at collarbone height. Press straight up, moving your head out of the way. Lock out at the top with the bar directly over your midfoot.",
    commonMistakes: [
      "Excessive lower back arch",
      "Pressing the bar forward instead of straight up",
      "Not using full range of motion"
    ],
    breathing: "Inhale at the bottom. Exhale as you press overhead.",
    ratios: {
      beginner: 0.2,
      intermediate: 0.4,
      advanced: 0.65
    }
  },
  {
    slug: "dumbbell-shoulder-press",
    name: "Dumbbell Shoulder Press",
    group: "Shoulders",
    equipment: "Dumbbells",
    primaryMuscles: [
      "Front delts"
    ],
    secondaryMuscles: [
      "Side delts",
      "Triceps"
    ],
    difficulty: "beginner",
    tips: "Press the dumbbells up and slightly inward so they nearly touch at the top. Keep your core tight and avoid arching your back.",
    commonMistakes: [
      "Flaring elbows too far back",
      "Arching the lower back excessively",
      "Not pressing through full range of motion"
    ],
    breathing: "Inhale as you lower the dumbbells to shoulder height. Exhale as you press up.",
    ratios: {
      beginner: 0.1,
      intermediate: 0.2,
      advanced: 0.35
    }
  },
  {
    slug: "lateral-raise",
    name: "Lateral Raise",
    group: "Shoulders",
    equipment: "Dumbbells",
    primaryMuscles: [
      "Side delts"
    ],
    secondaryMuscles: [
      "Traps"
    ],
    difficulty: "beginner",
    tips: "Lead with your elbows, not your hands. Raise to shoulder height or slightly below. Use a controlled tempo with a slight pause at the top.",
    commonMistakes: [
      "Using momentum/swinging the weights",
      "Raising too high above shoulders",
      "Shrugging the traps instead of engaging delts"
    ],
    breathing: "Inhale at the bottom. Exhale as you raise the dumbbells.",
    ratios: {
      beginner: 0.05,
      intermediate: 0.1,
      advanced: 0.15
    }
  },
  {
    slug: "face-pull",
    name: "Face Pull",
    group: "Shoulders",
    equipment: "Cable",
    primaryMuscles: [
      "Rear delts"
    ],
    secondaryMuscles: [
      "Upper back",
      "Rotator cuff"
    ],
    difficulty: "beginner",
    tips: "Set the cable at upper chest height. Pull toward your face with elbows high, externally rotating at the end. Squeeze your rear delts and upper back.",
    commonMistakes: [
      "Using too much weight and turning it into a row",
      "Not externally rotating at the end",
      "Leaning back excessively"
    ],
    breathing: "Inhale as you extend arms. Exhale as you pull toward your face."
  },
  {
    slug: "barbell-squat",
    name: "Barbell Squat",
    group: "Legs",
    equipment: "Barbell",
    primaryMuscles: [
      "Quads",
      "Glutes"
    ],
    secondaryMuscles: [
      "Hamstrings",
      "Adductors",
      "Core"
    ],
    difficulty: "advanced",
    tips: "Place the bar on your upper traps (high bar) or rear delts (low bar). Break at hips and knees simultaneously. Push knees out over toes and keep chest up.",
    commonMistakes: [
      "Knees caving inward",
      "Not hitting parallel depth",
      "Leaning too far forward / good-morning the squat",
      "Lifting heels off the ground"
    ],
    breathing: "Take a deep breath and brace before descending. Exhale as you drive up from the bottom.",
    ratios: {
      beginner: 0.4,
      intermediate: 0.85,
      advanced: 1.35
    }
  },
  {
    slug: "goblet-squat",
    name: "Goblet Squat",
    group: "Legs",
    equipment: "Dumbbell or kettlebell",
    primaryMuscles: [
      "Quads",
      "Glutes"
    ],
    secondaryMuscles: [
      "Adductors",
      "Core"
    ],
    difficulty: "beginner",
    tips: "Hold a dumbbell or kettlebell at chest height. Sit straight down between your legs. Use this to learn proper squat depth and knee tracking.",
    commonMistakes: [
      "Rounding the upper back",
      "Not sitting deep enough",
      "Letting the weight pull you forward"
    ],
    breathing: "Inhale as you descend. Exhale as you stand up.",
    ratios: {
      beginner: 0.1,
      intermediate: 0.2,
      advanced: 0.35
    }
  },
  {
    slug: "leg-press",
    name: "Leg Press",
    group: "Legs",
    equipment: "Machine",
    primaryMuscles: [
      "Quads",
      "Glutes"
    ],
    secondaryMuscles: [
      "Hamstrings",
      "Adductors"
    ],
    difficulty: "beginner",
    tips: "Place feet shoulder-width on the platform. Lower the sled until your knees are at about 90 degrees. Press through your whole foot, not just toes.",
    commonMistakes: [
      "Letting lower back round off the pad",
      "Locking out knees fully at the top",
      "Using too narrow or too wide a stance"
    ],
    breathing: "Inhale as you lower the weight. Exhale as you press up.",
    ratios: {
      beginner: 1,
      intermediate: 2,
      advanced: 3
    }
  },
  {
    slug: "lunge",
    name: "Lunge",
    group: "Legs",
    equipment: "Dumbbells or bodyweight",
    primaryMuscles: [
      "Quads",
      "Glutes"
    ],
    secondaryMuscles: [
      "Hamstrings",
      "Adductors"
    ],
    difficulty: "beginner",
    tips: "Take a large enough step that both knees form about 90 degrees at the bottom. Keep your torso upright and core engaged.",
    commonMistakes: [
      "Knee going too far past toes",
      "Not stepping far enough",
      "Leaning forward excessively"
    ],
    breathing: "Inhale as you step and lower. Exhale as you push back up.",
    ratios: {
      beginner: 0.1,
      intermediate: 0.25,
      advanced: 0.4
    }
  },
  {
    slug: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    group: "Legs",
    equipment: "Dumbbells or bodyweight",
    primaryMuscles: [
      "Quads",
      "Glutes"
    ],
    secondaryMuscles: [
      "Hamstrings",
      "Adductors"
    ],
    difficulty: "intermediate",
    tips: "Elevate your rear foot on a bench. Keep most of your weight on the front leg. Lower until your front thigh is parallel to the floor.",
    commonMistakes: [
      "Standing too close to the bench",
      "Leaning forward excessively",
      "Not going deep enough"
    ],
    breathing: "Inhale as you lower down. Exhale as you drive up through the front foot.",
    ratios: {
      beginner: 0.1,
      intermediate: 0.25,
      advanced: 0.4
    }
  },
  {
    slug: "leg-curl",
    name: "Leg Curl",
    group: "Legs",
    equipment: "Machine",
    primaryMuscles: [
      "Hamstrings"
    ],
    secondaryMuscles: [
      "Calves"
    ],
    difficulty: "beginner",
    tips: "Adjust the pad to sit just above your ankles. Curl the weight up in a controlled manner and squeeze your hamstrings at the top.",
    commonMistakes: [
      "Lifting hips off the pad",
      "Using momentum to swing the weight",
      "Not going through full range of motion"
    ],
    breathing: "Inhale as you lower the weight. Exhale as you curl up.",
    ratios: {
      beginner: 0.2,
      intermediate: 0.4,
      advanced: 0.6
    }
  },
  {
    slug: "leg-extension",
    name: "Leg Extension",
    group: "Legs",
    equipment: "Machine",
    primaryMuscles: [
      "Quads"
    ],
    secondaryMuscles: [],
    difficulty: "beginner",
    tips: "Adjust the pad to sit on your lower shins. Extend fully and squeeze your quads at the top. Lower in a controlled manner.",
    commonMistakes: [
      "Using momentum/swinging",
      "Not fully extending",
      "Using too heavy a weight"
    ],
    breathing: "Inhale as you lower the weight. Exhale as you extend.",
    ratios: {
      beginner: 0.25,
      intermediate: 0.5,
      advanced: 0.75
    }
  },
  {
    slug: "calf-raise",
    name: "Calf Raise",
    group: "Legs",
    equipment: "Machine or bodyweight",
    primaryMuscles: [
      "Calves"
    ],
    secondaryMuscles: [],
    difficulty: "beginner",
    tips: "Rise up onto the balls of your feet as high as possible. Pause at the top and lower slowly below the platform for a full stretch.",
    commonMistakes: [
      "Not using full range of motion",
      "Bouncing at the bottom",
      "Bending knees during the movement"
    ],
    breathing: "Exhale as you rise up. Inhale as you lower.",
    ratios: {
      beginner: 0.3,
      intermediate: 0.6,
      advanced: 1
    }
  },
  {
    slug: "hip-thrust",
    name: "Hip Thrust",
    group: "Legs",
    equipment: "Barbell",
    primaryMuscles: [
      "Glutes"
    ],
    secondaryMuscles: [
      "Hamstrings",
      "Quads"
    ],
    difficulty: "beginner",
    tips: "Lean your upper back against a bench. Drive through your heels to thrust hips up. Squeeze glutes hard at the top with a brief pause.",
    commonMistakes: [
      "Hyperextending the lower back at the top",
      "Not driving through heels",
      "Chin tucking too aggressively"
    ],
    breathing: "Inhale at the bottom. Exhale as you thrust up.",
    ratios: {
      beginner: 0.4,
      intermediate: 0.8,
      advanced: 1.3
    }
  },
  {
    slug: "barbell-curl",
    name: "Barbell Curl",
    group: "Arms",
    equipment: "Barbell",
    primaryMuscles: [
      "Biceps"
    ],
    secondaryMuscles: [
      "Forearms"
    ],
    difficulty: "beginner",
    tips: "Keep your elbows pinned to your sides. Curl the bar up in a smooth arc and squeeze at the top. Lower under control.",
    commonMistakes: [
      "Swinging the body for momentum",
      "Moving elbows forward",
      "Not lowering all the way down"
    ],
    breathing: "Inhale as you lower the bar. Exhale as you curl up.",
    ratios: {
      beginner: 0.15,
      intermediate: 0.3,
      advanced: 0.45
    }
  },
  {
    slug: "dumbbell-curl",
    name: "Dumbbell Curl",
    group: "Arms",
    equipment: "Dumbbells",
    primaryMuscles: [
      "Biceps"
    ],
    secondaryMuscles: [
      "Forearms"
    ],
    difficulty: "beginner",
    tips: "Alternate or curl both arms together. Supinate your wrists (turn palms up) as you curl for maximum bicep activation.",
    commonMistakes: [
      "Swinging the weights up",
      "Not supinating the wrists",
      "Cutting the range of motion short"
    ],
    breathing: "Inhale at the bottom. Exhale as you curl up.",
    ratios: {
      beginner: 0.07,
      intermediate: 0.13,
      advanced: 0.2
    }
  },
  {
    slug: "hammer-curl",
    name: "Hammer Curl",
    group: "Arms",
    equipment: "Dumbbells",
    primaryMuscles: [
      "Brachialis",
      "Biceps"
    ],
    secondaryMuscles: [
      "Forearms"
    ],
    difficulty: "beginner",
    tips: "Keep palms facing each other throughout. This targets the brachialis and forearms in addition to biceps.",
    commonMistakes: [
      "Swinging the body",
      "Rotating the wrists during the curl",
      "Using too heavy a weight"
    ],
    breathing: "Inhale at the bottom. Exhale as you curl up.",
    ratios: {
      beginner: 0.08,
      intermediate: 0.15,
      advanced: 0.22
    }
  },
  {
    slug: "tricep-pushdown",
    name: "Tricep Pushdown",
    group: "Arms",
    equipment: "Cable",
    primaryMuscles: [
      "Triceps"
    ],
    secondaryMuscles: [],
    difficulty: "beginner",
    tips: "Keep elbows pinned to your sides. Push the bar/rope down until arms are fully extended. Squeeze triceps at the bottom.",
    commonMistakes: [
      "Flaring elbows out",
      "Leaning into the movement with body weight",
      "Not fully extending arms"
    ],
    breathing: "Inhale at the top. Exhale as you push down."
  },
  {
    slug: "skull-crusher",
    name: "Skull Crusher",
    group: "Arms",
    equipment: "EZ bar or barbell",
    primaryMuscles: [
      "Triceps"
    ],
    secondaryMuscles: [],
    difficulty: "intermediate",
    tips: "Lower the bar to your forehead or just behind your head. Keep upper arms perpendicular to the floor. Use a controlled tempo.",
    commonMistakes: [
      "Flaring elbows outward",
      "Moving upper arms during the lift",
      "Lowering too fast"
    ],
    breathing: "Inhale as you lower the bar. Exhale as you extend.",
    ratios: {
      beginner: 0.1,
      intermediate: 0.2,
      advanced: 0.35
    }
  },
  {
    slug: "tricep-dip",
    name: "Tricep Dip",
    group: "Arms",
    equipment: "Bodyweight",
    primaryMuscles: [
      "Triceps"
    ],
    secondaryMuscles: [
      "Chest",
      "Front delts"
    ],
    difficulty: "intermediate",
    tips: "Lean slightly forward to target chest, stay upright for more tricep focus. Lower until elbows reach about 90 degrees.",
    commonMistakes: [
      "Going too deep (shoulder strain)",
      "Flaring elbows too wide",
      "Swinging the body"
    ],
    breathing: "Inhale as you lower. Exhale as you push up."
  },
  {
    slug: "plank",
    name: "Plank",
    group: "Core",
    equipment: "Bodyweight",
    primaryMuscles: [
      "Abs",
      "Obliques"
    ],
    secondaryMuscles: [
      "Glutes",
      "Shoulders"
    ],
    difficulty: "beginner",
    tips: "Keep your body in a straight line. Engage your core by pulling your belly button toward your spine. Do not let your hips sag or pike.",
    commonMistakes: [
      "Hips sagging toward the floor",
      "Piking hips too high",
      "Holding breath"
    ],
    breathing: "Breathe steadily throughout. Do not hold your breath."
  },
  {
    slug: "hanging-leg-raise",
    name: "Hanging Leg Raise",
    group: "Core",
    equipment: "Bodyweight",
    primaryMuscles: [
      "Abs",
      "Hip flexors"
    ],
    secondaryMuscles: [
      "Obliques",
      "Forearms"
    ],
    difficulty: "advanced",
    tips: "Hang from a bar with arms extended. Raise legs to at least parallel while keeping them straight. Lower slowly under control.",
    commonMistakes: [
      "Swinging/using momentum",
      "Bending knees excessively",
      "Not raising legs high enough"
    ],
    breathing: "Exhale as you raise your legs. Inhale as you lower them."
  },
  {
    slug: "cable-crunch",
    name: "Cable Crunch",
    group: "Core",
    equipment: "Cable",
    primaryMuscles: [
      "Abs"
    ],
    secondaryMuscles: [
      "Obliques"
    ],
    difficulty: "beginner",
    tips: "Kneel below a cable with a rope attachment. Crunch down by flexing your spine, not your hips. Focus on bringing your ribs toward your pelvis.",
    commonMistakes: [
      "Sitting back into the heels instead of crunching",
      "Using arms to pull the weight",
      "Not controlling the eccentric"
    ],
    breathing: "Exhale as you crunch down. Inhale as you return to the start."
  },
  {
    slug: "front-squat",
    name: "Front Squat",
    group: "Legs",
    equipment: "Barbell",
    primaryMuscles: [
      "Quads"
    ],
    secondaryMuscles: [
      "Glutes",
      "Upper back",
      "Core"
    ],
    difficulty: "advanced",
    tips: "Rest the bar on your front delts with elbows high. Keep an upright torso throughout. This variation is more quad-dominant than back squat.",
    commonMistakes: [
      "Dropping elbows and letting the bar roll forward",
      "Leaning forward",
      "Not hitting full depth"
    ],
    breathing: "Brace your core with a deep breath before descending. Exhale as you drive up.",
    ratios: {
      beginner: 0.3,
      intermediate: 0.65,
      advanced: 1.1
    }
  },
  {
    slug: "sumo-deadlift",
    name: "Sumo Deadlift",
    group: "Legs",
    equipment: "Barbell",
    primaryMuscles: [
      "Glutes",
      "Adductors",
      "Quads"
    ],
    secondaryMuscles: [
      "Hamstrings",
      "Lower back",
      "Traps"
    ],
    difficulty: "intermediate",
    tips: "Take a wide stance with toes pointed outward. Grip the bar inside your knees. Push the floor away with your legs while keeping your chest up.",
    commonMistakes: [
      "Hips shooting up before the chest",
      "Knees caving in",
      "Rounding the lower back"
    ],
    breathing: "Brace with a deep breath before pulling. Exhale at the top.",
    ratios: {
      beginner: 0.5,
      intermediate: 1,
      advanced: 1.6
    }
  },
  {
    slug: "chest-press-machine",
    name: "Chest Press Machine",
    group: "Chest",
    equipment: "Machine",
    primaryMuscles: [
      "Chest"
    ],
    secondaryMuscles: [
      "Front delts",
      "Triceps"
    ],
    difficulty: "beginner",
    tips: "Adjust the seat so handles are at chest height. Press forward and squeeze at the end. Control the weight on the way back.",
    commonMistakes: [
      "Not adjusting the seat height properly",
      "Not using full range of motion",
      "Arching the back off the pad"
    ],
    breathing: "Inhale as handles come back. Exhale as you press forward."
  },
  {
    slug: "shoulder-press-machine",
    name: "Shoulder Press Machine",
    group: "Shoulders",
    equipment: "Machine",
    primaryMuscles: [
      "Front delts"
    ],
    secondaryMuscles: [
      "Side delts",
      "Triceps"
    ],
    difficulty: "beginner",
    tips: "Adjust the seat so handles start at shoulder height. Press straight up and lower under control.",
    commonMistakes: [
      "Arching the back",
      "Not using full range of motion",
      "Gripping too tightly"
    ],
    breathing: "Inhale as you lower. Exhale as you press up."
  },
  {
    slug: "bent-over-row",
    name: "Bent Over Row",
    group: "Back",
    equipment: "Barbell",
    primaryMuscles: [
      "Lats",
      "Upper back"
    ],
    secondaryMuscles: [
      "Biceps",
      "Rear delts",
      "Lower back"
    ],
    difficulty: "intermediate",
    tips: "Hinge forward to about 45 degrees. Pull toward your lower chest. Keep your back flat and core braced throughout.",
    commonMistakes: [
      "Too much body swing",
      "Rounding the back",
      "Jerking the weight up"
    ],
    breathing: "Inhale at the bottom. Exhale as you row up.",
    ratios: {
      beginner: 0.3,
      intermediate: 0.55,
      advanced: 0.85
    }
  },
  {
    slug: "t-bar-row",
    name: "T-Bar Row",
    group: "Back",
    equipment: "Barbell or machine",
    primaryMuscles: [
      "Upper back",
      "Lats"
    ],
    secondaryMuscles: [
      "Biceps",
      "Rear delts"
    ],
    difficulty: "intermediate",
    tips: "Stand over the bar with a wide stance. Use a close grip handle and pull toward your chest. Keep your back flat.",
    commonMistakes: [
      "Rounding the lower back",
      "Using too much body momentum",
      "Not squeezing at the top"
    ],
    breathing: "Inhale as you lower. Exhale as you pull up.",
    ratios: {
      beginner: 0.2,
      intermediate: 0.4,
      advanced: 0.65
    }
  },
  {
    slug: "dumbbell-fly",
    name: "Dumbbell Fly",
    group: "Chest",
    equipment: "Dumbbells",
    primaryMuscles: [
      "Chest"
    ],
    secondaryMuscles: [
      "Front delts"
    ],
    difficulty: "beginner",
    tips: "Keep a slight bend in elbows. Open arms wide in a hugging motion until you feel a chest stretch. Squeeze at the top.",
    commonMistakes: [
      "Bending elbows too much (turns into a press)",
      "Going too deep",
      "Using too heavy a weight"
    ],
    breathing: "Inhale as you open arms. Exhale as you bring them together.",
    ratios: {
      beginner: 0.08,
      intermediate: 0.15,
      advanced: 0.22
    }
  },
  {
    slug: "incline-dumbbell-press",
    name: "Incline Dumbbell Press",
    group: "Chest",
    equipment: "Dumbbells",
    primaryMuscles: [
      "Upper chest"
    ],
    secondaryMuscles: [
      "Front delts",
      "Triceps"
    ],
    difficulty: "beginner",
    tips: "Set bench to 30-45 degrees. Press dumbbells up and slightly inward. Lower until elbows are at chest level.",
    commonMistakes: [
      "Bench angle too steep",
      "Not controlling the descent",
      "Bouncing at the bottom"
    ],
    breathing: "Inhale as you lower. Exhale as you press up.",
    ratios: {
      beginner: 0.12,
      intermediate: 0.25,
      advanced: 0.38
    }
  },
  {
    slug: "shrug",
    name: "Shrug",
    group: "Back",
    equipment: "Dumbbells or barbell",
    primaryMuscles: [
      "Traps"
    ],
    secondaryMuscles: [
      "Forearms"
    ],
    difficulty: "beginner",
    tips: "Hold dumbbells or a barbell at your sides. Elevate your shoulders straight up toward your ears. Hold briefly and lower slowly.",
    commonMistakes: [
      "Rolling shoulders (not needed and can cause injury)",
      "Using too much momentum",
      "Not pausing at the top"
    ],
    breathing: "Exhale as you shrug up. Inhale as you lower.",
    ratios: {
      beginner: 0.2,
      intermediate: 0.4,
      advanced: 0.6
    }
  },
  {
    slug: "rack-pull",
    name: "Rack Pull",
    group: "Back",
    equipment: "Barbell",
    primaryMuscles: [
      "Upper back",
      "Glutes",
      "Lower back"
    ],
    secondaryMuscles: [
      "Traps",
      "Hamstrings",
      "Forearms"
    ],
    difficulty: "intermediate",
    tips: "Set the bar at knee height in a power rack. Use the same form as a deadlift from that position. Focus on lockout strength.",
    commonMistakes: [
      "Rounding the back",
      "Hyperextending at the top",
      "Jerking the bar off the pins"
    ],
    breathing: "Brace with a deep breath before pulling. Exhale at lockout.",
    ratios: {
      beginner: 0.6,
      intermediate: 1.2,
      advanced: 1.8
    }
  }
];

export function getExercise(slug: string) {
  return EXERCISES.find((e) => e.slug === slug);
}
