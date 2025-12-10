import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { technologies, SkillLevel, skillLevelLabels, skillLevelColors, Technology } from '@/data/technologies';
import { mockUser } from '@/data/mockUser';
import { Sparkles, Search, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'database', label: 'Database' },
  { id: 'language', label: 'Languages' },
];

export default function Skills() {
  const [skills, setSkills] = useState<Record<string, SkillLevel>>(() => {
    const initial: Record<string, SkillLevel> = {};
    mockUser.skills.forEach(skill => {
      initial[skill.technologyId] = skill.level;
    });
    return initial;
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSkillChange = (techId: string, level: SkillLevel) => {
    setSkills(prev => ({ ...prev, [techId]: level }));
  };

  const filteredTechnologies = technologies.filter(tech => {
    const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSkillLevel = (techId: string): SkillLevel => skills[techId] || null;

  const masteredCount = Object.values(skills).filter(l => l === 'expert' || l === 'good').length;
  const totalSkills = Object.values(skills).filter(l => l && l !== 'notInterested').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Skills Matrix
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Rate your proficiency to level up
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Progress:</span>
          <span className="font-bold gradient-text">{masteredCount}/{totalSkills}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50 border-border/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? 'shadow-glow' : ''}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredTechnologies.map((tech, index) => (
          <SkillCard
            key={tech.id}
            technology={tech}
            level={getSkillLevel(tech.id)}
            onLevelChange={(level) => handleSkillChange(tech.id, level)}
            index={index}
          />
        ))}
      </div>

      {filteredTechnologies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No technologies found</p>
        </div>
      )}
    </div>
  );
}

interface SkillCardProps {
  technology: Technology;
  level: SkillLevel;
  onLevelChange: (level: SkillLevel) => void;
  index: number;
}

function SkillCard({ technology, level, onLevelChange, index }: SkillCardProps) {
  return (
    <div 
      className="skill-card glass-card p-4 group"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-secondary/80 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
          {technology.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{technology.name}</h3>
          {level && (
            <Badge 
              variant={skillLevelColors[level] as any}
              className="text-[10px] mt-1"
            >
              {skillLevelLabels[level]}
            </Badge>
          )}
        </div>
      </div>

      <Select
        value={level || ''}
        onValueChange={(value) => onLevelChange(value as SkillLevel)}
      >
        <SelectTrigger className="w-full h-8 text-xs bg-secondary/50 border-border/50">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="expert">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
              Expert
            </span>
          </SelectItem>
          <SelectItem value="good">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan" />
              Good
            </span>
          </SelectItem>
          <SelectItem value="beginner">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              Beginner
            </span>
          </SelectItem>
          <SelectItem value="interested">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warning" />
              Interested
            </span>
          </SelectItem>
          <SelectItem value="notInterested">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
              Not Interested
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}