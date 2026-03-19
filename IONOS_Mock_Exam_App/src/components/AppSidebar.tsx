import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Dumbbell, BookOpen, StickyNote,
  Database, Trophy, User, Zap, Shield, Menu, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  {
    group: "Main",
    items: [
      { to: "/",               icon: LayoutDashboard, label: "Dashboard" },
      { to: "/practice",       icon: Dumbbell,        label: "Practice" },
      { to: "/learn",          icon: BookOpen,        label: "Learn" },
    ],
  },
  {
    group: "Tools",
    items: [
      { to: "/notes",          icon: StickyNote,      label: "Notes" },
      { to: "/manage/questions", icon: Database,      label: "Question Bank" },
      { to: "/reference",      icon: Shield,          label: "Reference" },
    ],
  },
  {
    group: "You",
    items: [
      { to: "/achievements",   icon: Trophy,          label: "Achievements" },
      { to: "/skills",         icon: Zap,             label: "Skills" },
      { to: "/profile",        icon: User,            label: "Profile" },
    ],
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();

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
                const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
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

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-border/50 shrink-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            IONOS Cloud Foundational
          </p>
        </div>
      )}
    </aside>
  );
}
