import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockUser } from '@/data/mockUser';
import { technologies } from '@/data/technologies';
import { User, Trophy, Target, Sparkles, BookOpen, Star } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const [nextTech, setNextTech] = useState('Kubernetes');

  const masteredTechs = mockUser.skills
    .filter(s => s.level === 'expert' || s.level === 'good')
    .map(s => technologies.find(t => t.id === s.technologyId))
    .filter(Boolean);

  const learningTechs = mockUser.skills
    .filter(s => s.level === 'beginner' || s.level === 'interested')
    .map(s => technologies.find(t => t.id === s.technologyId))
    .filter(Boolean);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary via-cyan to-accent" />
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-8">
            <Avatar className="h-24 w-24 border-4 border-card shadow-xl">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold">{mockUser.name}</h1>
              <p className="text-muted-foreground">{mockUser.email}</p>
            </div>
            <Badge variant="achievement" className="text-sm px-4 py-2">
              <Star className="w-4 h-4 mr-1.5" />
              {mockUser.title}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technologies Mastered */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Technologies Mastered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {masteredTechs.map(tech => (
                <div
                  key={tech!.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="text-lg">{tech!.icon}</span>
                  <span className="font-medium text-sm">{tech!.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technologies Learning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan" />
              Currently Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {learningTechs.map(tech => (
                <div
                  key={tech!.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan/10 border border-cyan/20 transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="text-lg">{tech!.icon}</span>
                  <span className="font-medium text-sm">{tech!.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Technology Goal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Next Technology I Want to Learn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Label htmlFor="next-tech" className="text-muted-foreground">
              Set your next learning goal
            </Label>
            <Input
              id="next-tech"
              value={nextTech}
              onChange={(e) => setNextTech(e.target.value)}
              placeholder="e.g., Kubernetes, Rust, GraphQL..."
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warning" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUser.achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`relative p-5 rounded-xl border transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-card to-secondary border-primary/20 hover:shadow-lg hover:-translate-y-1'
                    : 'bg-secondary/30 border-border opacity-60'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {achievement.unlocked && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" className="text-xs">Unlocked</Badge>
                  </div>
                )}
                <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {achievement.unlockedAt && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
