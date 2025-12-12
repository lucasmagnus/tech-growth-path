import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  LogOut,
  Gamepad2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/skills', label: 'Skills', icon: Sparkles },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      navigate('/');
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-20 bg-card/50 backdrop-blur-xl border-r border-border/50 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow animate-pulse-glow">
          <Gamepad2 className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              title={item.label}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-xl animate-pulse-ring border-2 border-primary" />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )} />
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-all duration-200"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </aside>
  );
}