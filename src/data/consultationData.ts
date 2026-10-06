export interface Doctor {
  id: string;
  name: string;
  title: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  specialty: string;
  photoUrl: string;
  earliestSlot: string;
  consultationModes: string[];
  bio: string;
}

export interface PackagePlan {
  id: string;
  name: string;
  tag: string;
  price: number;
  billingPeriod: string;
  description: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  duration: string;
  features: string[];
  icon: string;
}

export interface BookingDetails {
  bookingId: string;
  createdAt: string;
  patientName: string;
  patientPhone: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: string;
  agniStatus: string;
  selectedPackage: string;
  packagePrice: number;
  selectedDoctor: string;
  consultationMode: string;
  selectedSlot: string;
  regionalCenter: string;
  complaints: string[];
  notes: string;
}

export const DOCTORS: Doctor[] = [
  {
    id: "dr-meera",
    name: "Dr. Meera Sharma",
    title: "B.N.Y.S, Senior Naturopath & Yoga Guru",
    experience: "12+ Yrs Exp",
    rating: 4.9,
    reviewsCount: 1420,
    specialty: "Metabolic Reset, Hormonal Harmony & Chronic Gut Disorders",
    photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuApAAiTX5oQbQMlo_-60otkTa8iByu6H69WCzrHsE4fkwL2xi0RqZSNsk_Hn0IDabGhzlMsqBCm-kSSffRrlqd5pIjxWu0xIAJJS5Y64r6ZbJUjp4TvUkwrq6U4QlH_6X-FsFGZibKVVe53brRepycjRNPybgElEfTsG7DBpGWYb_MWVb2mvFMHescoWb5aeHW9Dlra46bnmudhJBJS38CHg6Lcdir6BsHD6Bzf-uLu6dCt95a6p-SF",
    earliestSlot: "Today, 2:15 PM",
    consultationModes: ["HD Video Call", "Clinic Telehealth"],
    bio: "Pioneer in clinical naturopathy integrating Ayurvedic Dinacharya with modern biomarker diagnostics. Over 8,000 successful gut and lifestyle reversals.",
  },
  {
    id: "dr-ananya",
    name: "Dr. Ananya Roy",
    title: "B.N.Y.S, M.D. (Ayurvedic Synergy & Herbology)",
    experience: "9+ Yrs Exp",
    rating: 4.95,
    reviewsCount: 980,
    specialty: "Gut Microbiome, PCOS/PCOD & Autoimmune Detox Protocols",
    photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuz7psqNLV8qEavCEb-KIuk5IiLPTALbu0HP0a1UtBz1nhhjo2_VTvUqoQ0BA8ltdgqhxY8C-E7uwAN7SdRdAspi9HdgrJT8GnC--4qnVakOhfeXTktWzS307vnQKg7AZOjgFC9gJdWIXqWZsrk9b3mTX--BIq_P9WsmtJEM9iYYsjnehCvcd__IvRGYglyZl3nuMas4goJiXdpvvRQxynEGkO8drVfYlz9WMPWAEhGnZdsvfPw2IT",
    earliestSlot: "Today, 4:30 PM",
    consultationModes: ["HD Video Call", "Audio Call"],
    bio: "Specializes in deep root-cause elimination of chronic inflammatory ailments through therapeutic fasting, herbal nutrition, and bio-circadian rhythm re-alignment.",
  },
  {
    id: "dr-shailesh",
    name: "Dr. Shailesh Verma",
    title: "B.N.Y.S, Hydrotherapy & Panchakarma Specialist",
    experience: "15+ Yrs Exp",
    rating: 4.88,
    reviewsCount: 2150,
    specialty: "Agni Digestion, Spinal Therapeutics & Mud Therapy",
    photoUrl: "https://lh3.googleusercontent.com/aida/AEtjO1X6vjtpHMKxtlc4gjQmCNkLUZ_prRZ3leYiRLHR1cSmXBsL1cPIA02UO4r3oXoLTY-v2C-Ne0zWwWOOUh_ufFZxQxdM_MLiW_py67e8fKgk2Ki6k_TldYP9sSOCMBsbOOXC3WVDCPW3pvF4YD7Zamcn_1riPtAZ6SJAAhcKsw_axhhW5uYzmkih5rLt2FbiOrhYk9nyrMjtF9KXb-3BVHTmGFmYEkHpe56OzVF8SbzoJ0T_HwLCVnC6tkA",
    earliestSlot: "Tomorrow, 10:00 AM",
    consultationModes: ["HD Video Call", "Clinic Telehealth"],
    bio: "Renowned practitioner of traditional mud and hydro therapies for musculoskeletal rejuvenation, stress release, and cellular detoxification.",
  },
];

export const PACKAGES: PackagePlan[] = [
  {
    id: "pkg-basic",
    name: "Basic Wellness Consultation",
    tag: "Entry Session",
    price: 799,
    billingPeriod: "per session",
    duration: "30 Mins",
    description: "Ideal for immediate ailment assessment and seasonal gut reset blueprints.",
    icon: "psychiatry",
    features: [
      "1-on-1 Online Consultation (30 mins)",
      "Digital Naturopathic Diet & Lifestyle Chart",
      "Personalized Herbal Recommendations List",
      "Tongue & Agni Diagnostic Evaluation",
      "7-Day Follow-Up WhatsApp Chat Support",
    ],
  },
  {
    id: "pkg-standard",
    name: "Standard Holistic Care Program",
    tag: "Most Popular",
    price: 1999,
    billingPeriod: "per month",
    duration: "28 Days Duration",
    isPopular: true,
    description: "Targeted dosha balancing program with guided continuous doctor monitoring.",
    icon: "eco",
    features: [
      "2 Video Consultations (45 mins each) with Senior BNYS Doctor",
      "Personalized 28-day Meal & Herbal Detox Protocol",
      "Guided Pranayama & Yoga Asana Video Routines",
      "Weekly WhatsApp Progress Check-In & Diet Tweaks",
      "Free Home Delivery of 1 Botanical Herbal Formulation Pack",
      "Digital Tongue & Bio-Metric Tracking Dossier",
    ],
  },
  {
    id: "pkg-premium",
    name: "Premium Complete Rejuvenation",
    tag: "Best Value",
    price: 4499,
    billingPeriod: "per 3 months",
    duration: "90 Days Deep Healing",
    isBestValue: true,
    description: "Complete root-cause reversal journey supervised by lead MD Naturopaths.",
    icon: "workspace_premium",
    features: [
      "Unlimited WhatsApp Text Consults & 4 Comprehensive Doctor Reviews",
      "Personalized Panchakarma & Detox Kit Dispatched to Doorstep",
      "1-on-1 Dedicated Lifestyle Coach & Ayurvedic Nutritionist",
      "Bi-Weekly Biometric Vital Tracking & Blood/Lab Test Review",
      "Stress, Sleep & Meditation Masterclass Access",
      "Priority Same-Day Dispensary Courier Support",
    ],
  },
];

export const REGIONAL_CENTERS = [
  {
    id: "blr",
    name: "Bangalore Botanical Hub - Indiranagar",
    city: "Bangalore, Karnataka",
    leadTime: "3 hours express dispatch",
    active: true,
    address: "100ft Road, Indiranagar, Bengaluru 560038",
  },
  {
    id: "del",
    name: "Delhi Naturopathy Shala - GK-II",
    city: "New Delhi, Delhi",
    leadTime: "4 hours express dispatch",
    active: true,
    address: "M-Block, Greater Kailash II, New Delhi 110048",
  },
  {
    id: "mum",
    name: "Mumbai Coastal Sanctuary - Bandra",
    city: "Mumbai, Maharashtra",
    leadTime: "4 hours express dispatch",
    active: true,
    address: "Pali Hill, Bandra West, Mumbai 400050",
  },
  {
    id: "pan-india",
    name: "Pan-India & Global Express Telehealth",
    city: "All Pincodes & Global Courier",
    leadTime: "24-48 hours courier delivery",
    active: true,
    address: "Central Dispensary, PranaVeda Wellness HQ",
  },
];

export const COMPLAINT_OPTIONS = [
  { id: "gut", label: "Digestion & Gut Health", icon: "nutrition", desc: "Acidity, bloating, constipation, IBS" },
  { id: "sleep", label: "Stress & Insomnia", icon: "bedtime", desc: "Sleep cycle, anxiety, mental fatigue" },
  { id: "fatigue", label: "Chronic Fatigue", icon: "battery_horiz_000", desc: "Low vitality, sluggish metabolism" },
  { id: "hormone", label: "Hormonal Balance", icon: "cycle", desc: "PCOS/PCOD, thyroid, cycles" },
  { id: "joint", label: "Joint & Musculoskeletal", icon: "accessibility_new", desc: "Arthritis, back pain, stiffness" },
  { id: "detox", label: "Detoxification & Skin", icon: "clean_hands", desc: "Acne, allergies, liver cleanse" },
  { id: "weight", label: "Natural Weight Balance", icon: "fitness_center", desc: "Healthy metabolic rate reset" },
  { id: "respiratory", label: "Respiratory & Immunity", icon: "air", desc: "Allergies, sinus, seasonal colds" },
];

export const PANCHA_MAHABHUTA_ELEMENTS = [
  {
    id: "earth",
    sanskrit: "Prithvi",
    english: "Earth",
    icon: "nature",
    color: "#2d5a43",
    tagline: "Cellular Stability & Bone Density",
    description: "Earth provides grounding, skeletal structure, tissue density, and mineral nourishment. Balance Prithvi to cure chronic frailty, emaciation, and musculoskeletal pain with therapeutic unrefined clay and roots.",
  },
  {
    id: "water",
    sanskrit: "Jala",
    english: "Water",
    icon: "water_drop",
    color: "#14422d",
    tagline: "Lymphatic Flow & Metabolic Lubrication",
    description: "Water governs cellular hydration, biological fluids, and digestive enzymes. Controlled hydrotherapy and alkaline water infusions flush metabolic Ama (cellular debris) from the gastrointestinal tract.",
  },
  {
    id: "fire",
    sanskrit: "Agni",
    english: "Fire",
    icon: "local_fire_department",
    color: "#c26d49",
    tagline: "Metabolic Fire & Nutrient Transformation",
    description: "Agni fuels enzyme secretion, nutrient assimilation, and visual acuity. Strengthening low digestive fire (Mandaagni) prevents endotoxin buildup, lethargy, and auto-antigen generation.",
  },
  {
    id: "air",
    sanskrit: "Vayu",
    english: "Air",
    icon: "air",
    color: "#536251",
    tagline: "Neurological Pulsation & Breathwork",
    description: "Air governs neuromuscular transmission, cellular respiration, and bowel peristalsis. Guided Pranayama calms hyperactive Vata, resetting sympathetic nervous tone and anxiety.",
  },
  {
    id: "space",
    sanskrit: "Akasha",
    english: "Ether / Space",
    icon: "all_inclusive",
    color: "#3a674f",
    tagline: "Intercellular Silence & Therapeutic Fasting",
    description: "Space represents the hollow cavities of heart, lungs, and gut. Intermittent therapeutic fasting creates physiological Akasha, stimulating autophagy and deep cellular repair.",
  },
];

export const CLIENT_STORIES = [
  {
    id: "story-1",
    name: "Sunita Nambiar",
    city: "Kochi, Kerala",
    age: 34,
    condition: "Reversed Severe PCOS & Acidity in 90 Days",
    result: "Natural Ovulation Restored • Zero Synthetic Hormones",
    quote: "I was prescribed birth control pills for 6 years with worsening fatigue. Dr. Ananya redesigned my circadian meals and introduced seed-cycling decoctions. In 3 months, my cycles normalized naturally!",
    photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuApAAiTX5oQbQMlo_-60otkTa8iByu6H69WCzrHsE4fkwL2xi0RqZSNsk_Hn0IDabGhzlMsqBCm-kSSffRrlqd5pIjxWu0xIAJJS5Y64r6ZbJUjp4TvUkwrq6U4QlH_6X-FsFGZibKVVe53brRepycjRNPybgElEfTsG7DBpGWYb_MWVb2mvFMHescoWb5aeHW9Dlra46bnmudhJBJS38CHg6Lcdir6BsHD6Bzf-uLu6dCt95a6p-SF",
    stars: 5,
    packageUsed: "Premium Complete Rejuvenation",
  },
  {
    id: "story-2",
    name: "Vikram Malhotra",
    city: "Gurugram, Haryana",
    age: 42,
    condition: "Cured Chronic GERD & High Cholesterol",
    result: "Discontinued Antacids • LDL Dropped 38 Pts",
    quote: "Late-night corporate dinners ruined my gut. Dr. Meera's copper-water protocol and alkaline botanical decoctions healed my stomach lining within weeks without taking PPI pills anymore.",
    photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuz7psqNLV8qEavCEb-KIuk5IiLPTALbu0HP0a1UtBz1nhhjo2_VTvUqoQ0BA8ltdgqhxY8C-E7uwAN7SdRdAspi9HdgrJT8GnC--4qnVakOhfeXTktWzS307vnQKg7AZOjgFC9gJdWIXqWZsrk9b3mTX--BIq_P9WsmtJEM9iYYsjnehCvcd__IvRGYglyZl3nuMas4goJiXdpvvRQxynEGkO8drVfYlz9WMPWAEhGnZdsvfPw2IT",
    stars: 5,
    packageUsed: "Standard Holistic Care",
  },
  {
    id: "story-3",
    name: "Dr. Rohini Deshmukh",
    city: "Pune, Maharashtra",
    age: 29,
    condition: "Insomnia & Chronic Migraine Resolution",
    result: "Deep REM Sleep • Migraine Free for 8 Months",
    quote: "Being a physician myself, I was amazed at how targeted hydrotherapy foot-baths and Brahmi extracts reset my circadian sleep cycle. Naturopathy addresses what pills only mask.",
    photoUrl: "https://lh3.googleusercontent.com/aida/AEtjO1X6vjtpHMKxtlc4gjQmCNkLUZ_prRZ3leYiRLHR1cSmXBsL1cPIA02UO4r3oXoLTY-v2C-Ne0zWwWOOUh_ufFZxQxdM_MLiW_py67e8fKgk2Ki6k_TldYP9sSOCMBsbOOXC3WVDCPW3pvF4YD7Zamcn_1riPtAZ6SJAAhcKsw_axhhW5uYzmkih5rLt2FbiOrhYk9nyrMjtF9KXb-3BVHTmGFmYEkHpe56OzVF8SbzoJ0T_HwLCVnC6tkA",
    stars: 5,
    packageUsed: "Standard Holistic Care",
  },
];

export const DOSHA_QUESTIONS = [
  {
    id: "digestion",
    question: "How does your digestive system behave on a typical day?",
    options: [
      { text: "Irregular, prone to sudden bloating, dry stools or gas", dosha: "vata" },
      { text: "Intense hunger, fast digestion, prone to acidity or loose stools", dosha: "pitta" },
      { text: "Slow digestion, feels heavy after meals, can skip meals easily", dosha: "kapha" },
    ],
  },
  {
    id: "sleep",
    question: "What is your sleep pattern like?",
    options: [
      { text: "Light, easily awakened, frequent vivid dreams or insomnia", dosha: "vata" },
      { text: "Moderate (6-7 hrs), wake up alert, disturbed if room is warm", dosha: "pitta" },
      { text: "Deep, heavy (8+ hrs), hard to wake up early in the morning", dosha: "kapha" },
    ],
  },
  {
    id: "weather",
    question: "Which climate do you find most uncomfortable?",
    options: [
      { text: "Cold, dry, and windy conditions", dosha: "vata" },
      { text: "Hot, humid, direct blazing sun", dosha: "pitta" },
      { text: "Cold, damp, and rainy gloomy weather", dosha: "kapha" },
    ],
  },
  {
    id: "frame",
    question: "How would you describe your natural physical body frame?",
    options: [
      { text: "Slender, lean, prominent joints, difficult to gain weight", dosha: "vata" },
      { text: "Medium, athletic, warm skin, moderate muscle tone", dosha: "pitta" },
      { text: "Solid, broad shoulders/hips, easily gains weight", dosha: "kapha" },
    ],
  },
  {
    id: "stress",
    question: "Under high work stress or emotional pressure, you tend to feel:",
    options: [
      { text: "Anxious, restless, racing thoughts, difficulty making decisions", dosha: "vata" },
      { text: "Irritable, impatient, sharp temper, critical", dosha: "pitta" },
      { text: "Withdrawn, stubborn, procrastinating, emotionally eating", dosha: "kapha" },
    ],
  },
];
