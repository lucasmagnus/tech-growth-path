import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser } from '@/data/mockUser';
import { technologies } from '@/data/technologies';
import { Target, Trophy, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [missionComplete, setMissionComplete] = useState(false);
  
  const expertSkills = mockUser.skills.filter(s => s.level === 'expert').length;
  const learningSkills = mockUser.skills.filter(s => s.level === 'interested' || s.level === 'beginner').length;
  const totalProgress = Math.round((mockUser.skills.filter(s => s.level === 'expert' || s.level === 'good').length / technologies.length) * 100);
  
  const unlockedAchievements = mockUser.achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-lg">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {mockUser.name.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Keep learning and growing your skills</p>
          </div>
        </div>
        <Badge variant="achievement" className="text-sm px-4 py-1.5">
          <Trophy className="w-4 h-4 mr-1.5" />
          {mockUser.title}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover className="group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Technologies Mastered</p>
                <p className="text-3xl font-bold mt-1 gradient-text">{expertSkills}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover className="group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Queue</p>
                <p className="text-3xl font-bold mt-1 text-cyan">{learningSkills}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-cyan" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover className="group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-3xl font-bold mt-1 text-accent">{unlockedAchievements}/{mockUser.achievements.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card hover className="group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Project</p>
                <p className="text-lg font-semibold mt-1 truncate">{mockUser.lastProject}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Skills Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Mastery</span>
                <span className="text-sm text-muted-foreground">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} showGlow className="h-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Most Used Tech</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚛️</span>
                  <span className="font-semibold">{mockUser.mostUsedTech}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Current Stack</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Mission */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              This Week's Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {missionComplete ? (
              <div className="text-center py-6 space-y-4 animate-scale-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Mission Complete!</p>
                  <p className="text-sm text-muted-foreground">Great job on your learning journey</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
                  <p className="font-medium mb-1">Choose one new skill to learn</p>
                  <p className="text-sm text-muted-foreground">Expand your horizons and add a new technology to your learning queue.</p>
                </div>
                <Button 
                  variant="gradient" 
                  className="w-full"
                  onClick={() => setMissionComplete(true)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete Mission
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warning" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockUser.achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-card border-primary/20 hover:shadow-md hover:-translate-y-1'
                    : 'bg-secondary/50 border-border opacity-50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`text-3xl mb-2 ${achievement.unlocked ? 'animate-bounce-subtle' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <p className="text-xs font-medium text-center">{achievement.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
