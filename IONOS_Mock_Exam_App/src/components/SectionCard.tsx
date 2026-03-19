import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { IONOSSection, SECTION_INFO, SectionStats } from '@/types/gmat';
import { Calculator, BookOpen, BarChart3, ChevronRight } from 'lucide-react';

const iconMap = {
  Calculator,
  BookOpen,
  BarChart3,
};

interface SectionCardProps {
  section: IONOSSection;
  info: typeof SECTION_INFO[IONOSSection];
  accuracy: number;
  questionCount: number;
  stats: SectionStats;
}

export function SectionCard({ section, info, accuracy, questionCount, stats }: SectionCardProps) {
  const Icon = iconMap[info.icon as keyof typeof iconMap] || Calculator;

  return (
    <Link to={`/practice/${section}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="glass hover-lift cursor-pointer group border-border/50 hover:border-primary/50 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-1">
              {info.name}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4">
              {questionCount} questions available
            </p>

            {stats.questionsAnswered > 0 ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="text-primary font-medium">{accuracy}%</span>
                </div>
                <Progress value={accuracy} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{stats.correct}/{stats.questionsAnswered} correct</span>
                  <span>Avg: {Math.round(stats.averageTime)}s</span>
                </div>
              </div>
            ) : (
              <div className="py-2 px-3 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">
                  Start practicing to see stats
                </p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Types: {info.types.map(t => t.label).join(', ')}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

