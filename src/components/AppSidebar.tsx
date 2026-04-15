import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Dumbbell, BookOpen, StickyNote,
  Database, Trophy, User, Zap, Shield, Menu, ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = [
  {
    group: "Main",
    items: [
      { to: "/dashboard",        icon: LayoutDashboard, label: "Dashboard" },
      { to: "/practice",         icon: Dumbbell,        label: "Practice" },
      { to: "/learn",            icon: BookOpen,        label: "Learn" },
    ],
  },
  {
    group: "Tools",
    items: [
      { to: "/notes",            icon: StickyNote,      label: "Notes" },
      { to: "/manage/questions", icon: Database,        label: "Question Bank" },
      { to: "/reference",        icon: Shield,          label: "Reference" },
    ],
  },
  {
    group: "You",
    items: [
      { to: "/achievements",     icon: Trophy,          label: "Achievements" },
      { to: "/skills",           icon: Zap,             label: "Skills" },
      { to: "/profile",          icon: User,            label: "Profile" },
    ],
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const navigate  = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 bg-sidebar-background border-r border-border/50 transition-all duration-300 ease-in-out z-40",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center h-14 px-3 border-b border-border/50 shrink-0",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <span className="text-xs font-bold uppercase tracking-widest text-primary truncate">
            IONOS Prep
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* User info */}
      {user && (
        <div className={cn(
          "flex items-center gap-2 px-3 py-3 border-b border-border/50 shrink-0",
          collapsed && "justify-center px-0"
        )}>
          <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-primary">{initials}</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {user.displayName ?? user.email}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-6 px-2">
        {NAV_ITEMS.map(({ group, items }) => (
          <div key={group}>
            {!collapsed && (
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 px-2">
                {group}
              </p>
            )}
            <ul className="space-y-1">
              {items.map(({ to, icon: Icon, label }) => {
                const active = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));
                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-all duration-200 group",
                        active
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : "text-muted-foreground hover:bg-primary/8 hover:text-foreground",
                        collapsed && "justify-center px-0"
                      )}
                      title={collapsed ? label : undefined}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                      {!collapsed && <span className="truncate">{label}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer — sign out */}
      <div className={cn(
        "px-2 py-3 border-t border-border/50 shrink-0 space-y-1",
      )}>
        {!collapsed && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest px-2 mb-2">
            IONOS Cloud Foundational
          </p>
        )}
        <button
          onClick={handleSignOut}
          className={cn(
            "w-full flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200",
            collapsed && "justify-center px-0"
          )}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
