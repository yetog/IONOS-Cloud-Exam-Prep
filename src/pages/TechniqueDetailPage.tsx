import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Target, AlertTriangle, Lightbulb, Play, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TECHNIQUES, PASSAGE_TYPES, RC_QUESTION_TYPES } from '@/types/technique';
import { GMATSection, QuestionType, SECTION_INFO } from '@/types/gmat';
import { DSFlowChart } from '@/components/DSFlowChart';

export default function TechniqueDetailPage() {
  const { section, type } = useParams<{ section: GMATSection; type: QuestionType }>();
  const navigate = useNavigate();

  const technique = type ? TECHNIQUES[type as QuestionType] : null;
  const sectionInfo = section ? SECTION_INFO[section as GMATSection] : null;

  if (!technique || !sectionInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Technique not found</h1>
          <Link to="/learn">
            <Button>Back to Learn</Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <Link to="/learn">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learn
            </Button>
          </Link>
          
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {sectionInfo.name}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {technique.title}
          </h1>
          <p className="text-muted-foreground">
            {technique.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Key Strategies */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target className="w-5 h-5" />
                Key Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {technique.keyStrategies.map((strategy, idx) => (
                  <AccordionItem key={idx} value={`strategy-${idx}`}>
                    <AccordionTrigger className="text-foreground hover:text-primary">
                      {strategy.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-4">{strategy.description}</p>
                      {strategy.steps && (
                        <ol className="list-decimal list-inside space-y-2">
                          {strategy.steps.map((step, stepIdx) => (
                            <li key={stepIdx} className="text-sm">{step}</li>
                          ))}
                        </ol>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Common Traps */}
          <Card className="glass border-warning/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                Common Traps to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {technique.commonTraps.map((trap, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <h4 className="font-medium text-foreground mb-2">{trap.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{trap.description}</p>
                    <div className="flex items-start gap-2 text-sm">
                      <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-primary">{trap.howToAvoid}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Management */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Time Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{technique.timeManagement}</p>
            </CardContent>
          </Card>

          {/* Example Approach */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Example Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{technique.exampleApproach}</p>
            </CardContent>
          </Card>

          {/* DS Flowchart - only for data-sufficiency */}
          {type === 'data-sufficiency' && (
            <DSFlowChart />
          )}

          {/* RC Passage Types and Question Categories - only for reading-comprehension */}
          {type === 'reading-comprehension' && (
            <>
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Passage Types
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {PASSAGE_TYPES.map((pt, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold text-foreground mb-2">{pt.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{pt.description}</p>
                      <div className="flex items-start gap-2 text-sm">
                        <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-primary">{pt.approach}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Question Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {RC_QUESTION_TYPES.map((qt, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold text-foreground mb-2">{qt.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{qt.description}</p>
                      <div className="flex items-start gap-2 text-sm">
                        <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-primary">{qt.strategy}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {/* Practice Button */}
          <Button
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-primary"
            onClick={() => navigate(`/practice/${section}?type=${type}`)}
          >
            <Play className="w-5 h-5 mr-2" />
            Practice {technique.title} Questions
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
