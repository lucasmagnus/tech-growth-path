import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
import { Sparkles, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const categories = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'database', label: 'Database' },
  { id: 'language', label: 'Languages' },
  { id: 'tools', label: 'Tools' },
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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          Skills Matrix
        </h1>
        <p className="text-muted-foreground mt-2">
          Rate your proficiency in each technology to build your skill profile
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-200"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
          <p className="text-muted-foreground">No technologies found matching your criteria</p>
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
    <Card 
      className="skill-card hover:shadow-lg transition-all duration-300 group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-secondary group-hover:scale-110 transition-transform duration-300"
            >
              {technology.icon}
            </div>
            <div>
              <h3 className="font-semibold">{technology.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">{technology.category}</p>
            </div>
          </div>
          {level && (
            <Badge 
              variant={skillLevelColors[level] as any}
              className="animate-scale-in"
            >
              {skillLevelLabels[level]}
            </Badge>
          )}
        </div>

        <Select
          value={level || ''}
          onValueChange={(value) => onLevelChange(value as SkillLevel)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your level" />
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
      </CardContent>
    </Card>
  );
}
