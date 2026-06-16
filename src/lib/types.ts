// Mirrors the enum string values defined in FitMind-Backend so payloads
// sent from the demo wizard pass backend validation without guessing.

export const Gender = {
  Male: "Male",
  Female: "Female",
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const ActivityLevel = {
  Sedentary: "Sedentary",
  LightlyActive: "Lightly Active",
  ModeratelyActive: "Moderately Active",
  VeryActive: "Very Active",
  ExtraActive: "Extra Active",
} as const;
export type ActivityLevel = (typeof ActivityLevel)[keyof typeof ActivityLevel];

export const FitnessGoal = {
  LoseWeight: "Lose Weight",
  TryAiCoach: "Try AI Coach",
  GetBulks: "Get Bulks",
  ImproveEndurance: "Improve Endurance",
} as const;
export type FitnessGoal = (typeof FitnessGoal)[keyof typeof FitnessGoal];

export const WorkoutLocation = {
  Gym: "Gym",
  Home: "Home",
  Outdoor: "Outdoor",
  Hybrid: "Hybrid",
} as const;
export type WorkoutLocation = (typeof WorkoutLocation)[keyof typeof WorkoutLocation];

export const EquipmentAvailability = {
  FullGym: "Full Gym Equipment",
  Basic: "Basic Equipment",
  None: "No Equipment",
} as const;
export type EquipmentAvailability =
  (typeof EquipmentAvailability)[keyof typeof EquipmentAvailability];

export const WorkoutFocus = {
  Strength: "Strength Training",
  Cardio: "Cardiovascular",
  Flexibility: "Flexibility",
  Hybrid: "Hybrid",
  SportSpecific: "Sport Specific",
} as const;
export type WorkoutFocus = (typeof WorkoutFocus)[keyof typeof WorkoutFocus];

export const WorkoutDifficulty = {
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
} as const;
export type WorkoutDifficulty = (typeof WorkoutDifficulty)[keyof typeof WorkoutDifficulty];

export const CaloriePreference = {
  Auto: "Auto",
  Custom: "Custom",
} as const;
export type CaloriePreference = (typeof CaloriePreference)[keyof typeof CaloriePreference];

export const MealComplexity = {
  Quick: "Quick",
  Moderate: "Moderate",
  Elaborate: "Elaborate",
  Mixed: "Mixed",
} as const;
export type MealComplexity = (typeof MealComplexity)[keyof typeof MealComplexity];

export const CuisineType = {
  Mediterranean: "Mediterranean",
  Asian: "Asian",
  Western: "Western",
  MiddleEastern: "Middle Eastern",
  Latin: "Latin American",
  Vegetarian: "Vegetarian",
  Vegan: "Vegan",
  Mixed: "Mixed",
} as const;
export type CuisineType = (typeof CuisineType)[keyof typeof CuisineType];

/** Everything in here maps 1:1 to a field on the backend's ProfileBase
 * (age, gender, height, weight, fitness_goal, activity_level,
 * dietary_preference, medical_conditions, allergies, injuries, medications).
 * This is the ONLY data the assessment wizard collects — nothing here is
 * plan-generation-only. */
export interface ProfileAnswers {
  fitnessGoal: FitnessGoal;
  gender: Gender;
  weightKg: number;
  heightCm: number;
  age: number;
  fitnessLevel: number; // 1-5, maps to ActivityLevel
  physicalLimitations: string[]; // -> medical_conditions + injuries
  allergies: string[];
  dietPreference: string;
  supplements: string[]; // -> medications
}

/** Collected separately, only if/when the user opts into generating a plan.
 * Maps 1:1 to WorkoutPreferences + NutritionPreferences on the backend. */
export interface PlanPreferences {
  wantsWorkout: boolean;
  wantsNutrition: boolean;
  durationWeeks: number;
  daysPerWeek: number;
  workoutLocation: WorkoutLocation;
  equipmentAvailability: EquipmentAvailability;
  workoutFocus: WorkoutFocus;
  workoutDifficulty: WorkoutDifficulty;
  sessionDurationMinutes: number;
  caloriePreference: CaloriePreference;
  customCalorieTarget?: number;
  mealsPerDay: number;
  mealComplexity: MealComplexity;
  cuisinePreference: CuisineType;
  excludeIngredients: string[];
}
