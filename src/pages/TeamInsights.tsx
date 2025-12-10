import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { teamStats } from '@/data/mockUser';
import { Users, TrendingUp, Layers, Flame, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(213, 100%, 65%)', 'hsl(257, 100%, 69%)', 'hsl(194, 75%, 63%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)'];

export default function TeamInsights() {
  const masteredData = teamStats.mostMastered.map(item => ({
    name: item.tech,
    value: item.count,
  }));

  const wantedData = teamStats.mostWanted.map(item => ({
    name: item.tech,
    value: item.count,
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          Team Insights
        </h1>
        <p className="text-muted-foreground mt-2">
          Discover what technologies your team masters and wants to learn
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Mastered */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Most Mastered Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={masteredData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" fill="url(#primaryGradient)" radius={[0, 4, 4, 0]} />
                  <defs>
                    <linearGradient id="primaryGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(213, 100%, 65%)" />
                      <stop offset="100%" stopColor="hsl(257, 100%, 69%)" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Most Wanted */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan" />
              Most Requested Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wantedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {wantedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hottest Stacks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent" />
            Hottest Stacks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamStats.hottestStacks.map((stack, index) => (
              <div key={index} className="p-4 rounded-xl bg-secondary/50 border border-border hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{stack.name}</h3>
                  <Badge variant="secondary">{stack.users} developers</Badge>
                </div>
                <Progress value={(stack.users / 10) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Technologies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-warning" />
            Trending Inside the Company
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamStats.trending.map((item, index) => (
              <div
                key={item.tech}
                className="relative p-5 rounded-xl bg-gradient-to-br from-card to-secondary border border-border hover:shadow-lg transition-all hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-3 right-3">
                  <Badge variant="success" className="text-xs">
                    +{item.growth}%
                  </Badge>
                </div>
                <h3 className="font-bold text-lg">{item.tech}</h3>
                <p className="text-sm text-muted-foreground mt-1">Growth this quarter</p>
                <div className="mt-3 h-1 rounded-full bg-secondary overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-success to-cyan transition-all duration-1000"
                    style={{ width: `${item.growth}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
