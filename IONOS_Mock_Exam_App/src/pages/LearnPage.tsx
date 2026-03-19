import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calculator, BarChart3, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SECTION_INFO, IONOSSection } from '@/types/gmat';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const sectionIcons = {
  'unit1': Calculator,
  'unit2': BookOpen,
  'unit3': BarChart3,
};

export default function LearnPage() {
  const navigate = useNavigate();
  const sections: IONOSSection[] = ['unit1', 'unit2', 'unit3'];

  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Learn <span className="text-primary text-glow">Technique</span>
          </h1>
          <p className="text-muted-foreground">
            Master the strategies and approaches for each question type before diving into practice.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {sections.map((section) => {
            const info = SECTION_INFO[section];
            const Icon = sectionIcons[section];

            return (
              <motion.div key={section} variants={item}>
                <Card className="glass hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">{info.name}</h2>
                    </div>
                    
                    <div className="grid gap-2">
                      {info.types.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => navigate(`/learn/${section}/${type.value}`)}
                          className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/50 transition-all group"
                        >
                          <span className="text-foreground group-hover:text-primary transition-colors">
                            {type.label}
                          </span>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

