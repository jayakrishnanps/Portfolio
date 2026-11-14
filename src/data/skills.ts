export interface Skill {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Databases" | "Tools";
  highlight?: boolean;
}

export const skills: Skill[] = [
  // Languages
  { name: "TypeScript", category: "Languages", highlight: true },
  { name: "JavaScript", category: "Languages", highlight: true },
  { name: "Python", category: "Languages", highlight: true },
  { name: "Kotlin", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "HTML5 / CSS3", category: "Languages" },

  // Frontend
  { name: "React", category: "Frontend", highlight: true },
  { name: "Next.js", category: "Frontend", highlight: true },
  { name: "Tailwind CSS", category: "Frontend", highlight: true },
  { name: "Responsive UI/UX", category: "Frontend" },
  { name: "State Management", category: "Frontend" },
  { name: "Vite", category: "Frontend" },

  // Backend
  { name: "Django", category: "Backend", highlight: true },
  { name: "Django REST Framework", category: "Backend", highlight: true },
  { name: "Node.js", category: "Backend", highlight: true },
  { name: "Express.js", category: "Backend" },
  { name: "RESTful API Design", category: "Backend", highlight: true },
  { name: "WebSockets", category: "Backend" },

  // Databases
  { name: "MongoDB", category: "Databases", highlight: true },
  { name: "PostgreSQL", category: "Databases" },
  { name: "MySQL", category: "Databases" },
  { name: "Room (Android)", category: "Databases" },

  // Tools & Platforms
  { name: "Electron", category: "Tools", highlight: true },
  { name: "Git & GitHub", category: "Tools", highlight: true },
  { name: "Monaco Editor API", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Linux / Shell", category: "Tools" },
  { name: "Postman", category: "Tools" },
];

export const skillCategories = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "Tools",
] as const;

export type SkillCategory = (typeof skillCategories)[number];
