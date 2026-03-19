import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";

const SIDEBAR_KEY = "ionos-sidebar-collapsed";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_KEY);
      // If never set before, default: open on desktop, closed on mobile
      if (stored === null) return window.innerWidth < 768;
      return stored === "true";
    } catch { return true; }
  });

  // Persist collapse state
  useEffect(() => {
    try { localStorage.setItem(SIDEBAR_KEY, String(collapsed)); }
    catch { /* ignore */ }
  }, [collapsed]);

  // Keyboard shortcut: Cmd/Ctrl + B
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setCollapsed(prev => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — hidden on mobile, shown md+ */}
      <div className="hidden md:flex shrink-0">
        <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(prev => !prev)} />
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-background/95 backdrop-blur-sm border-b border-border/50 flex items-center px-4 gap-3">
        <button
          onClick={() => setCollapsed(prev => !prev)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-bold uppercase tracking-widest text-primary">IONOS Prep</span>
      </div>

      {/* Mobile sidebar overlay */}
      {!collapsed && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-56 flex">
            <AppSidebar collapsed={false} onToggle={() => setCollapsed(true)} />
          </div>
          <div
            className="flex-1 bg-background/60 backdrop-blur-sm"
            onClick={() => setCollapsed(true)}
          />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 md:overflow-auto pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
