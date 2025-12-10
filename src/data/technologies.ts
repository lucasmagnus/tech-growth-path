export type SkillLevel = 'expert' | 'good' | 'beginner' | 'interested' | 'notInterested' | null;

export interface Technology {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'cloud' | 'database' | 'tools' | 'language';
  color: string;
}

export const technologies: Technology[] = [
  // Frontend
  { id: 'react', name: 'React', icon: '⚛️', category: 'frontend', color: '#61DAFB' },
  { id: 'vue', name: 'Vue.js', icon: '💚', category: 'frontend', color: '#4FC08D' },
  { id: 'angular', name: 'Angular', icon: '🅰️', category: 'frontend', color: '#DD0031' },
  { id: 'nextjs', name: 'Next.js', icon: '▲', category: 'frontend', color: '#000000' },
  { id: 'svelte', name: 'Svelte', icon: '🔥', category: 'frontend', color: '#FF3E00' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: '🎨', category: 'frontend', color: '#06B6D4' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', icon: '💚', category: 'backend', color: '#339933' },
  { id: 'python', name: 'Python', icon: '🐍', category: 'backend', color: '#3776AB' },
  { id: 'java', name: 'Java', icon: '☕', category: 'backend', color: '#007396' },
  { id: 'dotnet', name: '.NET', icon: '🔷', category: 'backend', color: '#512BD4' },
  { id: 'go', name: 'Go', icon: '🐹', category: 'backend', color: '#00ADD8' },
  { id: 'rust', name: 'Rust', icon: '🦀', category: 'backend', color: '#000000' },
  
  // Mobile
  { id: 'reactnative', name: 'React Native', icon: '📱', category: 'mobile', color: '#61DAFB' },
  { id: 'flutter', name: 'Flutter', icon: '🦋', category: 'mobile', color: '#02569B' },
  { id: 'swift', name: 'Swift', icon: '🍎', category: 'mobile', color: '#FA7343' },
  { id: 'kotlin', name: 'Kotlin', icon: '🤖', category: 'mobile', color: '#7F52FF' },
  
  // Cloud
  { id: 'aws', name: 'AWS', icon: '☁️', category: 'cloud', color: '#FF9900' },
  { id: 'azure', name: 'Azure', icon: '🔵', category: 'cloud', color: '#0078D4' },
  { id: 'gcp', name: 'Google Cloud', icon: '🌐', category: 'cloud', color: '#4285F4' },
  { id: 'docker', name: 'Docker', icon: '🐳', category: 'cloud', color: '#2496ED' },
  { id: 'kubernetes', name: 'Kubernetes', icon: '⚙️', category: 'cloud', color: '#326CE5' },
  
  // Database
  { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', category: 'database', color: '#4169E1' },
  { id: 'mongodb', name: 'MongoDB', icon: '🍃', category: 'database', color: '#47A248' },
  { id: 'mysql', name: 'MySQL', icon: '🐬', category: 'database', color: '#4479A1' },
  { id: 'redis', name: 'Redis', icon: '🔴', category: 'database', color: '#DC382D' },
  
  // Languages
  { id: 'typescript', name: 'TypeScript', icon: '📘', category: 'language', color: '#3178C6' },
  { id: 'javascript', name: 'JavaScript', icon: '💛', category: 'language', color: '#F7DF1E' },
  { id: 'csharp', name: 'C#', icon: '💜', category: 'language', color: '#239120' },
  { id: 'cpp', name: 'C++', icon: '⚡', category: 'language', color: '#00599C' },
  
  // Tools
  { id: 'git', name: 'Git', icon: '📚', category: 'tools', color: '#F05032' },
  { id: 'graphql', name: 'GraphQL', icon: '◼️', category: 'tools', color: '#E10098' },
  { id: 'figma', name: 'Figma', icon: '🎨', category: 'tools', color: '#F24E1E' },
  { id: 'jira', name: 'Jira', icon: '📋', category: 'tools', color: '#0052CC' },
];

export const skillLevelLabels: Record<NonNullable<SkillLevel>, string> = {
  expert: 'Expert',
  good: 'Good',
  beginner: 'Beginner',
  interested: 'Interested',
  notInterested: 'Not Interested',
};

export const skillLevelColors: Record<NonNullable<SkillLevel>, string> = {
  expert: 'expert',
  good: 'good',
  beginner: 'beginner',
  interested: 'interested',
  notInterested: 'notInterested',
};
