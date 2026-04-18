export interface App {
    slug: string;
    name: string;
    icon: string;
    description: string;
    appStoreUrl: string;
    category: string;
}

export const apps: App[] = [
    {
        slug: "blood-sugar-tracker",
        name: "Blood Sugar Tracker",
        icon: "/images/blood-sugar-tracker.png",
        description: "Take control of your diabetes with confidence.",
        appStoreUrl: "https://apps.apple.com/us/app/blood-sugar-tracker-glucose/id1568059086",
        category: "Medical",
    },
    {
        slug: "plant-identifier",
        name: "Plant Identifier & Water Diary",
        icon: "/images/plant-identifier.png",
        description: "Turn your phone into the ultimate plant care tool.",
        appStoreUrl: "https://apps.apple.com/us/app/plant-identifier-water-diary/id1558263170",
        category: "Lifestyle",
    },
    {
        slug: "insect-identifier",
        name: "Insect Identifier",
        icon: "/images/insect-identifier.png",
        description: "Your pocket-sized bug identifier and nature companion.",
        appStoreUrl: "https://apps.apple.com/us/app/insect-identifier-bug-bite/id6478978580",
        category: "Education",
    },
    {
        slug: "antique-identifier",
        name: "Antique Identifier",
        icon: "/images/antique-identifier.png",
        description: "Uncover the history and value of antiques with AI.",
        appStoreUrl: "https://apps.apple.com/us/app/antique-identify-value/id6746053182",
        category: "Reference",
    },
    {
        slug: "card-value-scanner",
        name: "Baseball Card Value Scanner",
        icon: "/images/card-value-scanner.png",
        description: "Understand what your baseball cards are truly worth.",
        appStoreUrl: "https://apps.apple.com/us/app/baseball-card-value-scanner/id6746519123",
        category: "Sports",
    },
    {
        slug: "blood-pressure-diary",
        name: "Blood Pressure Diary",
        icon: "/images/blood-pressure-diary.png",
        description: "Track your blood pressure with confidence.",
        appStoreUrl: "https://apps.apple.com/us/app/blood-pressure-diary-log/id1562382455",
        category: "Medical",
    },
    {
        slug: "card-centering",
        name: "Card Centering Calculator",
        icon: "/images/card-centering.png",
        description: "Unlock true grading potential for your trading cards.",
        appStoreUrl: "https://apps.apple.com/us/app/card-centering-calculator/id6747995027",
        category: "Utilities",
    },
    {
        slug: "fasting-tracker",
        name: "Intermittent Fasting Tracker",
        icon: "/images/fasting-tracker.png",
        description: "Your personal fasting coach for a healthier lifestyle.",
        appStoreUrl: "https://apps.apple.com/us/app/intermittent-fasting-tracker-8/id1553675533",
        category: "Health & Fitness",
    },
    {
        slug: "class-planner",
        name: "Class Planner & AI Math Solver",
        icon: "/images/class-planner.png",
        description: "Keep your semester organized with smart planning.",
        appStoreUrl: "https://apps.apple.com/us/app/class-planner-ai-math-solver/id6755330310",
        category: "Education",
    },
    {
        slug: "pitch-counter",
        name: "Pitch Counter - Radar Gun",
        icon: "/images/pitch-counter.png",
        description: "Streamline scorekeeping and pitch tracking for baseball.",
        appStoreUrl: "https://apps.apple.com/us/app/pitch-counter-radar-gun-fynx/id6747143531",
        category: "Sports",
    },
    {
        slug: "pill-reminder",
        name: "Birth Control Reminder",
        icon: "/images/pill-reminder.png",
        description: "Never forget to take your medication.",
        appStoreUrl: "https://apps.apple.com/us/app/birth-control-reminder-pill/id1563590149",
        category: "Medical",
    },
];
