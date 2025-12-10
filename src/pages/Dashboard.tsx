import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser } from '@/data/mockUser';
import { technologies } from '@/data/technologies';
import { Trophy, Zap, Target, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const expertSkills = mockUser.skills.filter(s => s.level === 'expert').length;
  const goodSkills = mockUser.skills.filter(s => s.level === 'good').length;
  const totalMastered = expertSkills + goodSkills;
  const xpProgress = Math.round((totalMastered / technologies.length) * 100);
  const level = Math.floor(xpProgress / 10) + 1;
  
  const unlockedAchievements = mockUser.achievements.filter(a => a.unlocked);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Player Card */}
      <div className="glass-card p-6 neon-border">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-primary/50 shadow-glow">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold shadow-glow">
              {level}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{mockUser.name}</h1>
              <Badge variant="achievement" className="text-xs">
                <Trophy className="w-3 h-3 mr-1" />
                {mockUser.title}
              </Badge>
            </div>
            
            {/* XP Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Zap className="w-4 h-4 text-primary" />
                  Level {level}
                </span>
                <span className="text-primary font-medium">{xpProgress}% XP</span>
              </div>
              <div className="xp-bar h-3">
                <div className="xp-bar-fill" style={{ width: `${xpProgress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5 text-center hover-lift cursor-pointer" onClick={() => navigate('/skills')}>
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <p className="text-3xl font-bold gradient-text">{totalMastered}</p>
          <p className="text-sm text-muted-foreground mt-1">Skills Mastered</p>
        </div>

        <div className="glass-card p-5 text-center hover-lift cursor-pointer" onClick={() => navigate('/skills')}>
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-accent" />
          </div>
          <p className="text-3xl font-bold text-accent">{expertSkills}</p>
          <p className="text-sm text-muted-foreground mt-1">Expert Level</p>
        </div>

        <div className="glass-card p-5 text-center hover-lift">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-warning/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-warning" />
          </div>
          <p className="text-3xl font-bold text-warning">{unlockedAchievements.length}</p>
          <p className="text-sm text-muted-foreground mt-1">Achievements</p>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {mockUser.achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'opacity-40'}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`text-3xl mb-2 ${achievement.unlocked ? 'animate-bounce-subtle' : 'grayscale'}`}>
                {achievement.icon}
              </div>
              <p className="text-xs font-medium text-center leading-tight">{achievement.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}