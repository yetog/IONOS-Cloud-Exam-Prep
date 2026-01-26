import { motion } from 'framer-motion';
import { ChevronDown, Clock, Target, Lightbulb, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { QuestionSubType } from '@/types/questionSubTypes';

interface SubTypeBreakdownProps {
  title: string;
  subTypes: QuestionSubType[];
}

export function SubTypeBreakdown({ title, subTypes }: SubTypeBreakdownProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Target className="w-5 h-5" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Click each sub-type to see identification cues and solution frameworks
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {subTypes.map((subType, idx) => (
          <motion.div
            key={subType.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Collapsible
              open={openItems.includes(subType.id)}
              onOpenChange={() => toggleItem(subType.id)}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <span className="text-primary font-bold text-sm">{idx + 1}</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {subType.name}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {subType.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {Math.floor(subType.timeTarget / 60)}:{(subType.timeTarget % 60).toString().padStart(2, '0')}
                    </Badge>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        openItems.includes(subType.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 space-y-4 bg-muted/10 rounded-b-lg border-t border-border/50">
                  {/* Identification Cues */}
                  <div>
                    <h5 className="font-medium text-foreground mb-2 flex items-center gap-2 text-sm">
                      <Search className="w-4 h-4 text-primary" />
                      How to Identify
                    </h5>
                    <ul className="space-y-1">
                      {subType.identificationCues.map((cue, cueIdx) => (
                        <li key={cueIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {cue}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solution Framework */}
                  <div>
                    <h5 className="font-medium text-foreground mb-2 flex items-center gap-2 text-sm">
                      <Lightbulb className="w-4 h-4 text-warning" />
                      Solution Framework
                    </h5>
                    <ol className="space-y-1">
                      {subType.solutionFramework.map((step, stepIdx) => (
                        <li key={stepIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary font-medium">{stepIdx + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Example Stem */}
                  {subType.exampleStem && (
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <h5 className="font-medium text-foreground mb-1 text-sm">Example Question Stem:</h5>
                      <p className="text-sm text-muted-foreground italic">
                        "{subType.exampleStem}"
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
