import type { Lang } from "./lang-context";

// Flat English -> Arabic dictionary for assessment/plan step content
// (titles, option labels, chip suggestions, slider labels). Keyed by the
// exact English string already used as the canonical label in steps.ts,
// so no restructuring of the step data model is needed — just look up the
// displayed text through trStep() at render time.
const STEP_AR: Record<string, string> = {
  // Profile — fitness goal
  "What's your fitness goal/target?": "إيه هدفك في اللياقة؟",
  "I wanna lose weight": "عايز أخس",
  "I wanna try AI Coach": "عايز أجرّب المدرب الذكي",
  "I wanna get bulks": "عايز أزيد عضلات",
  "I wanna gain endurance": "عايز أزود تحملي",

  // Profile — gender
  "What is your gender?": "إيه نوعك؟",
  "Male": "ذكر",
  "Female": "أنثى",

  // Profile — body stats
  "What is your weight?": "إيه وزنك؟",
  "What is your height?": "إيه طولك؟",
  "What is your age?": "إيه سنك؟",

  // Profile — fitness level
  "How would you rate your fitness level?": "تقيّم لياقتك عاملة إزاي؟",
  "Beginner": "مبتدئ",
  "Novice": "مبتدئ متوسط",
  "Somewhat Athletic": "رياضي شوية",
  "Athletic": "رياضي",
  "Elite": "محترف",

  // Profile — limitations
  "Do you have any physical limitations?": "عندك أي حاجة بتحد حركتك؟",
  "Knee Pain": "ألم في الركبة",
  "Back Pain": "ألم في الضهر",
  "Arthritis": "التهاب مفاصل",
  "Asthma": "ربو",
  "Obesity": "سمنة",
  "Muscle Pain": "ألم عضلي",

  // Profile — allergies
  "Do you have any food allergies?": "عندك حساسية من أكلات معينة؟",
  "Peanuts": "فول سوداني",
  "Tree Nuts": "مكسرات",
  "Shellfish": "قشريات بحرية",
  "Dairy": "ألبان",
  "Gluten": "جلوتين",
  "Eggs": "بيض",
  "Soy": "صويا",

  // Profile — diet preference
  "Do you have a specific diet preference?": "عندك نظام أكل معين بتفضّله؟",
  "Plant Based": "نباتي",
  "Carbo Diet": "نشويات",
  "Specialized": "متخصص",
  "Traditional": "تقليدي",

  // Profile — supplements
  "Are you taking any supplements?": "بتاخد أي مكملات غذائية؟",
  "Protein": "بروتين",
  "Whey": "واي بروتين",
  "BCAAs": "أحماض أمينية (BCAA)",
  "Vitamin D": "فيتامين د",
  "Magnesium": "ماجنيسيوم",
  "Creatine": "كرياتين",
  "Omega-3": "أوميجا ٣",

  // Training location / equipment
  "Where will you train?": "هتتمرن فين؟",
  "Gym": "جيم",
  "Home": "البيت",
  "Outdoor": "برا",
  "Hybrid": "مختلط",
  "What equipment do you have?": "معاك أي معدات؟",
  "Full Gym Equipment": "معدات جيم كاملة",
  "Basic Equipment": "معدات بسيطة",
  "No Equipment": "من غير معدات",

  // Plan — duration / frequency
  "How many weeks should this plan cover?": "الخطة تغطي كام أسبوع؟",
  "How many days/wk will you commit?": "هتلتزم بكام يوم في الأسبوع؟",
  "Where & how will you train?": "هتتمرن فين وإزاي؟",

  // Plan — workout focus
  "What should your workout focus on?": "تمارينك تركّز على إيه؟",
  "Strength Training": "تمارين قوة",
  "Cardiovascular": "كارديو",
  "Flexibility": "مرونة",
  "Sport Specific": "رياضة معينة",

  // Plan — difficulty
  "What difficulty level do you want?": "عايز مستوى صعوبة إيه؟",
  "Intermediate": "متوسط",
  "Advanced": "متقدم",

  // Plan — session duration
  "How long should each session be?": "كل حصة تاخد قد إيه؟",

  // Plan — calorie preference
  "How should we set your calorie target?": "نحسب السعرات إزاي؟",
  "Auto — let AI calculate it": "أوتوماتيك — يحسبها الذكاء الاصطناعي",
  "Custom — I'll set my own": "بنفسي — هحدد رقمي",
  "What's your calorie goal per day?": "هدفك من السعرات في اليوم قد إيه؟",

  // Plan — meals per day
  "How many meals per day?": "كام وجبة في اليوم؟",

  // Plan — meal complexity
  "How much cooking time do you want?": "وقت الطبخ اللي تحبه قد إيه؟",
  "Quick": "سريع",
  "Moderate": "متوسط",
  "Elaborate": "مجهود أكبر",
  "Mixed": "متنوع",

  // Plan — cuisine
  "Any cuisine preference?": "بتفضّل مطبخ معين؟",
  "Mediterranean": "متوسطي",
  "Asian": "آسيوي",
  "Western": "غربي",
  "Middle Eastern": "شرق أوسطي",
  "Latin American": "لاتيني",
  "Vegetarian": "نباتي (بيض وألبان)",
  "Vegan": "نباتي بحت",

  // Plan — exclude ingredients
  "Any ingredients to avoid?": "فيه مكونات عايز تتجنبها؟",
  "Pork": "لحم خنزير",
  "Beef": "لحم بقري",
  "Mushrooms": "مشروم",
  "Cilantro": "كزبرة",
  "Spicy food": "أكل حار",
};

export function trStep(text: string, lang: Lang): string {
  if (lang !== "ar") return text;
  return STEP_AR[text] ?? text;
}
