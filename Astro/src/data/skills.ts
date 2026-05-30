export interface Skill {
  name: string;
  level: number;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Tools';
}

export const skills: Skill[] = [
  { name: 'JavaScript', level: 92, category: 'Languages' },
  { name: 'TypeScript', level: 88, category: 'Languages' },
  { name: 'Python', level: 85, category: 'Languages' },
  { name: 'Java', level: 70, category: 'Languages' },
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'Next.js', level: 87, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Express.js', level: 83, category: 'Backend' },
  { name: 'Django', level: 80, category: 'Backend' },
  { name: 'MongoDB', level: 86, category: 'Databases' },
  { name: 'MySQL', level: 78, category: 'Databases' },
  { name: 'AI/ML Integration', level: 82, category: 'Tools' },
  { name: 'API Development', level: 90, category: 'Tools' },
  { name: 'Database Design', level: 84, category: 'Tools' },
  { name: 'Full-Stack Development', level: 91, category: 'Tools' },
];

export const skillCategories = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'Tools'] as const;

export type SkillCategory = typeof skillCategories[number];
