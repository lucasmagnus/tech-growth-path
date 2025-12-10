import { SkillLevel } from './technologies';

export interface UserSkill {
  technologyId: string;
  level: SkillLevel;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  lastProject: string;
  mostUsedTech: string;
  skills: UserSkill[];
  achievements: Achievement[];
  joinedAt: string;
}

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@company.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  title: 'Full Stack Wizard',
  lastProject: 'E-Commerce Platform',
  mostUsedTech: 'React',
  skills: [
    { technologyId: 'react', level: 'expert' },
    { technologyId: 'typescript', level: 'expert' },
    { technologyId: 'nodejs', level: 'good' },
    { technologyId: 'postgresql', level: 'good' },
    { technologyId: 'docker', level: 'beginner' },
    { technologyId: 'aws', level: 'interested' },
    { technologyId: 'kubernetes', level: 'interested' },
    { technologyId: 'flutter', level: 'beginner' },
    { technologyId: 'python', level: 'good' },
    { technologyId: 'tailwind', level: 'expert' },
    { technologyId: 'nextjs', level: 'good' },
    { technologyId: 'git', level: 'expert' },
    { technologyId: 'graphql', level: 'good' },
  ],
  achievements: [
    {
      id: 'react-expert',
      title: 'React Expert',
      description: 'Mastered React development',
      icon: '⚛️',
      unlocked: true,
      unlockedAt: '2024-01-15',
    },
    {
      id: 'cloud-explorer',
      title: 'Cloud Explorer',
      description: 'Started learning cloud technologies',
      icon: '☁️',
      unlocked: true,
      unlockedAt: '2024-02-20',
    },
    {
      id: 'full-stack',
      title: 'Full Stack Wizard',
      description: 'Proficient in both frontend and backend',
      icon: '🧙',
      unlocked: true,
      unlockedAt: '2024-03-10',
    },
    {
      id: 'mobile-master',
      title: 'Mobile Master',
      description: 'Expert in mobile development',
      icon: '📱',
      unlocked: false,
    },
    {
      id: 'javascript-ninja',
      title: 'JavaScript Ninja',
      description: 'Advanced JavaScript skills',
      icon: '🥷',
      unlocked: true,
      unlockedAt: '2024-01-05',
    },
    {
      id: 'backend-wizard',
      title: 'Backend Wizard',
      description: 'Mastered backend technologies',
      icon: '🔮',
      unlocked: false,
    },
  ],
  joinedAt: '2023-06-01',
};

export const teamStats = {
  mostMastered: [
    { tech: 'React', count: 12 },
    { tech: 'TypeScript', count: 10 },
    { tech: 'Node.js', count: 8 },
    { tech: 'PostgreSQL', count: 7 },
    { tech: 'Docker', count: 6 },
  ],
  mostWanted: [
    { tech: 'Kubernetes', count: 15 },
    { tech: 'AWS', count: 12 },
    { tech: 'Go', count: 10 },
    { tech: 'Rust', count: 8 },
    { tech: 'GraphQL', count: 7 },
  ],
  hottestStacks: [
    { name: 'React + Node.js + PostgreSQL', users: 8 },
    { name: 'Next.js + TypeScript + Tailwind', users: 6 },
    { name: 'Vue + Python + MongoDB', users: 4 },
  ],
  trending: [
    { tech: 'AI/ML', growth: 45 },
    { tech: 'Rust', growth: 35 },
    { tech: 'Kubernetes', growth: 28 },
    { tech: 'Go', growth: 22 },
  ],
};
