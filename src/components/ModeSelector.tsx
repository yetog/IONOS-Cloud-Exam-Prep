import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, BookOpen, FileText, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const modes = [
  {
    id: 'practice',
    title: 'Practice',
    description: 'Timed questions with instant feedback and XP rewards',
    icon: Zap,
    href: '/practice',
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    id: 'learn',
    title: 'Learn Technique',
    description: 'Master strategies and approaches for each question type',
    icon: BookOpen,
    href: '/learn',
    gradient: 'from-warning/20 to-warning/5',
    iconColor: 'text-warning',
  },
  {
    id: 'notes',
    title: 'Notes & Insights',
    description: 'Capture learnings, track mistakes, build your knowledge',
    icon: FileText,
    href: '/notes',
    gradient: 'from-secondary to-secondary/50',
    iconColor: 'text-secondary-foreground',
  },
  {
    id: 'manage',
    title: 'Question Bank',
    description: 'Add, import, and manage your custom questions',
    icon: Database,
    href: '/manage/questions',
    gradient: 'from-accent to-accent/50',
    iconColor: 'text-accent-foreground',
  },
];

export function ModeSelector() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {modes.map((mode, idx) => (
        <motion.div
          key={mode.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Link to={mode.href}>
            <Card className={cn(
              "glass hover-lift h-full cursor-pointer group transition-all",
              "hover:border-primary/50"
            )}>
              <CardContent className="p-6">
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                  "bg-gradient-to-br",
                  mode.gradient
                )}>
                  <mode.icon className={cn("w-7 h-7", mode.iconColor)} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {mode.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {mode.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
