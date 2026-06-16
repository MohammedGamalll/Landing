import {
  CaloriePreference,
  CuisineType,
  EquipmentAvailability,
  FitnessGoal,
  Gender,
  MealComplexity,
  WorkoutDifficulty,
  WorkoutFocus,
  WorkoutLocation,
} from "@/lib/types";

export type CardOption = { label: string; value: string; emoji?: string };

export type Step =
  | { kind: "cards"; key: string; title: string; options: CardOption[]; skipIf?: (a: Record<string, unknown>) => boolean }
  | { kind: "number"; key: string; title: string; min: number; max: number; step?: number; unit: string; defaultValue: number; skipIf?: (a: Record<string, unknown>) => boolean }
  | { kind: "slider"; key: string; title: string; labels: string[]; skipIf?: (a: Record<string, unknown>) => boolean }
  | { kind: "chips"; key: string; title: string; suggestions: string[]; skipIf?: (a: Record<string, unknown>) => boolean }
  | { kind: "training-setup"; key: "trainingSetup"; title: string; skipIf?: (a: Record<string, unknown>) => boolean };

// ── Profile assessment: every screen here maps directly to a real field on
// the backend's ProfileBase. Nothing plan-only lives in this list.
export const profileSteps: Step[] = [
  {
    kind: "cards",
    key: "fitnessGoal",
    title: "What's your fitness goal/target?",
    options: [
      { label: "I wanna lose weight", value: FitnessGoal.LoseWeight, emoji: "🔥" },
      { label: "I wanna try AI Coach", value: FitnessGoal.TryAiCoach, emoji: "🤖" },
      { label: "I wanna get bulks", value: FitnessGoal.GetBulks, emoji: "💪" },
      { label: "I wanna gain endurance", value: FitnessGoal.ImproveEndurance, emoji: "🫀" },
    ],
  },
  {
    kind: "cards",
    key: "gender",
    title: "What is your gender?",
    options: [
      { label: "Male", value: Gender.Male, emoji: "♂️" },
      { label: "Female", value: Gender.Female, emoji: "♀️" },
    ],
  },
  {
    kind: "number",
    key: "weightKg",
    title: "What is your weight?",
    min: 30,
    max: 220,
    unit: "kg",
    defaultValue: 70,
  },
  {
    kind: "number",
    key: "heightCm",
    title: "What is your height?",
    min: 120,
    max: 220,
    unit: "cm",
    defaultValue: 170,
  },
  {
    kind: "number",
    key: "age",
    title: "What is your age?",
    min: 13,
    max: 90,
    unit: "yrs",
    defaultValue: 25,
  },
  {
    kind: "slider",
    key: "fitnessLevel",
    title: "How would you rate your fitness level?",
    labels: ["Beginner", "Novice", "Somewhat Athletic", "Athletic", "Elite"],
  },
  {
    kind: "chips",
    key: "physicalLimitations",
    title: "Do you have any physical limitations?",
    suggestions: ["Knee Pain", "Back Pain", "Arthritis", "Asthma", "Obesity", "Muscle Pain"],
  },
  {
    kind: "chips",
    key: "allergies",
    title: "Do you have any food allergies?",
    suggestions: ["Peanuts", "Tree Nuts", "Shellfish", "Dairy", "Gluten", "Eggs", "Soy"],
  },
  {
    kind: "cards",
    key: "dietPreference",
    title: "Do you have a specific diet preference?",
    options: [
      { label: "Plant Based", value: "Plant Based", emoji: "🌱" },
      { label: "Carbo Diet", value: "Carbo Diet", emoji: "🍞" },
      { label: "Specialized", value: "Specialized", emoji: "🍽️" },
      { label: "Traditional", value: "Traditional", emoji: "🍎" },
    ],
  },
  {
    kind: "chips",
    key: "supplements",
    title: "Are you taking any supplements?",
    suggestions: ["Protein", "Whey", "BCAAs", "Vitamin D", "Magnesium", "Creatine", "Omega-3"],
  },
];

export const trainingLocationOptions: CardOption[] = [
  { label: "Gym", value: WorkoutLocation.Gym, emoji: "🏟️" },
  { label: "Home", value: WorkoutLocation.Home, emoji: "🏠" },
  { label: "Outdoor", value: WorkoutLocation.Outdoor, emoji: "🌳" },
  { label: "Hybrid", value: WorkoutLocation.Hybrid, emoji: "🔁" },
];

export const equipmentOptions: CardOption[] = [
  { label: "Full Gym Equipment", value: EquipmentAvailability.FullGym, emoji: "🏋️" },
  { label: "Basic Equipment", value: EquipmentAvailability.Basic, emoji: "🏋️‍♀️" },
  { label: "No Equipment", value: EquipmentAvailability.None, emoji: "🙌" },
];

// ── Plan preferences: collected only if the user opts into generating a
// plan after their profile is created. Maps 1:1 to WorkoutPreferences +
// NutritionPreferences on the backend.
export const planSteps: Step[] = [
  {
    kind: "number",
    key: "durationWeeks",
    title: "How many weeks should this plan cover?",
    min: 1,
    max: 52,
    unit: "weeks",
    defaultValue: 4,
  },
  {
    kind: "number",
    key: "daysPerWeek",
    title: "How many days/wk will you commit?",
    min: 1,
    max: 7,
    unit: "x weekly",
    defaultValue: 3,
    skipIf: (a) => !a.wantsWorkout,
  },
  {
    kind: "training-setup",
    key: "trainingSetup",
    title: "Where & how will you train?",
    skipIf: (a) => !a.wantsWorkout,
  },
  {
    kind: "cards",
    key: "workoutFocus",
    title: "What should your workout focus on?",
    skipIf: (a) => !a.wantsWorkout,
    options: [
      { label: "Strength Training", value: WorkoutFocus.Strength, emoji: "🏋️" },
      { label: "Cardiovascular", value: WorkoutFocus.Cardio, emoji: "❤️" },
      { label: "Flexibility", value: WorkoutFocus.Flexibility, emoji: "🧘" },
      { label: "Hybrid", value: WorkoutFocus.Hybrid, emoji: "🔁" },
      { label: "Sport Specific", value: WorkoutFocus.SportSpecific, emoji: "🏅" },
    ],
  },
  {
    kind: "cards",
    key: "workoutDifficulty",
    title: "What difficulty level do you want?",
    skipIf: (a) => !a.wantsWorkout,
    options: [
      { label: "Beginner", value: WorkoutDifficulty.Beginner, emoji: "🌱" },
      { label: "Intermediate", value: WorkoutDifficulty.Intermediate, emoji: "⚡" },
      { label: "Advanced", value: WorkoutDifficulty.Advanced, emoji: "🔥" },
    ],
  },
  {
    kind: "number",
    key: "sessionDurationMinutes",
    title: "How long should each session be?",
    min: 15,
    max: 180,
    step: 5,
    unit: "min",
    defaultValue: 45,
    skipIf: (a) => !a.wantsWorkout,
  },
  {
    kind: "cards",
    key: "caloriePreference",
    title: "How should we set your calorie target?",
    skipIf: (a) => !a.wantsNutrition,
    options: [
      { label: "Auto — let AI calculate it", value: CaloriePreference.Auto, emoji: "🤖" },
      { label: "Custom — I'll set my own", value: CaloriePreference.Custom, emoji: "🎯" },
    ],
  },
  {
    kind: "number",
    key: "customCalorieTarget",
    title: "What's your calorie goal per day?",
    min: 1200,
    max: 4000,
    step: 50,
    unit: "kcal daily",
    defaultValue: 1800,
    skipIf: (a) => !a.wantsNutrition || a.caloriePreference !== CaloriePreference.Custom,
  },
  {
    kind: "number",
    key: "mealsPerDay",
    title: "How many meals per day?",
    min: 3,
    max: 6,
    unit: "meals",
    defaultValue: 4,
    skipIf: (a) => !a.wantsNutrition,
  },
  {
    kind: "cards",
    key: "mealComplexity",
    title: "How much cooking time do you want?",
    skipIf: (a) => !a.wantsNutrition,
    options: [
      { label: "Quick", value: MealComplexity.Quick, emoji: "⏱️" },
      { label: "Moderate", value: MealComplexity.Moderate, emoji: "🍳" },
      { label: "Elaborate", value: MealComplexity.Elaborate, emoji: "👨‍🍳" },
      { label: "Mixed", value: MealComplexity.Mixed, emoji: "🔀" },
    ],
  },
  {
    kind: "cards",
    key: "cuisinePreference",
    title: "Any cuisine preference?",
    skipIf: (a) => !a.wantsNutrition,
    options: [
      { label: "Mediterranean", value: CuisineType.Mediterranean, emoji: "🥙" },
      { label: "Asian", value: CuisineType.Asian, emoji: "🍜" },
      { label: "Western", value: CuisineType.Western, emoji: "🍔" },
      { label: "Middle Eastern", value: CuisineType.MiddleEastern, emoji: "🧆" },
      { label: "Latin American", value: CuisineType.Latin, emoji: "🌮" },
      { label: "Vegetarian", value: CuisineType.Vegetarian, emoji: "🥗" },
      { label: "Vegan", value: CuisineType.Vegan, emoji: "🌱" },
      { label: "Mixed", value: CuisineType.Mixed, emoji: "🔀" },
    ],
  },
  {
    kind: "chips",
    key: "excludeIngredients",
    title: "Any ingredients to avoid?",
    skipIf: (a) => !a.wantsNutrition,
    suggestions: ["Pork", "Beef", "Shellfish", "Mushrooms", "Cilantro", "Spicy food"],
  },
];
