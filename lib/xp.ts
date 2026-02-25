// XP thresholds for each level: level N requires 100 * N^1.8 total XP
function xpRequiredForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.ceil(100 * Math.pow(level - 1, 1.8));
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (xpRequiredForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

export function xpProgressInLevel(xp: number): {
  current: number;
  needed: number;
  percent: number;
} {
  const level = levelFromXp(xp);
  const xpForCurrentLevel = xpRequiredForLevel(level);
  const xpForNextLevel = xpRequiredForLevel(level + 1);
  const current = xp - xpForCurrentLevel;
  const needed = xpForNextLevel - xpForCurrentLevel;
  const percent = Math.min(Math.round((current / needed) * 100), 100);
  return { current, needed, percent };
}

export function getLevelTitle(level: number): string {
  const titles = [
    "Novice",       // 1
    "Learner",      // 2
    "Practitioner", // 3
    "Skilled",      // 4
    "Proficient",   // 5
    "Advanced",     // 6
    "Expert",       // 7
    "Master",       // 8
    "Elite",        // 9
    "Legend",       // 10+
  ];
  return titles[Math.min(level - 1, titles.length - 1)];
}

export const BADGES = [
  {
    id: "first-lesson",
    name: "First Step",
    description: "Complete your first lesson",
    icon: "🎯",
  },
  {
    id: "5-lessons",
    name: "Getting Started",
    description: "Complete 5 lessons",
    icon: "📚",
  },
  {
    id: "10-lessons",
    name: "On a Roll",
    description: "Complete 10 lessons",
    icon: "🔥",
  },
  {
    id: "20-lessons",
    name: "Dedicated",
    description: "Complete 20 lessons",
    icon: "💪",
  },
  {
    id: "first-quiz",
    name: "Quiz Taker",
    description: "Pass your first quiz",
    icon: "✅",
  },
  {
    id: "3-quizzes",
    name: "Quiz Whiz",
    description: "Pass 3 quizzes",
    icon: "🧠",
  },
  {
    id: "sql-complete",
    name: "SQL Hero",
    description: "Complete the full SQL course",
    icon: "🗄️",
  },
  {
    id: "azure-complete",
    name: "Cloud Pro",
    description: "Complete the full Azure course",
    icon: "☁️",
  },
  {
    id: "500-xp",
    name: "XP Earner",
    description: "Earn 500 XP",
    icon: "⚡",
  },
  {
    id: "1000-xp",
    name: "XP Hunter",
    description: "Earn 1,000 XP",
    icon: "💎",
  },
  {
    id: "2500-xp",
    name: "XP Legend",
    description: "Earn 2,500 XP",
    icon: "👑",
  },
  {
    id: "perfect-quiz",
    name: "Perfectionist",
    description: "Score 100% on a quiz",
    icon: "🌟",
  },
];
