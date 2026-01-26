import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Clock, Target, Brain, Focus, Zap, AlertTriangle, CheckCircle, SkipForward, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tips = [
  {
    number: 1,
    title: 'Pace Yourself',
    icon: Clock,
    description: 'Keep track of time throughout each section. Know your target time per question and check periodically.',
    detail: 'Quant: ~2 min/question. Verbal: ~1.5-2 min/question. IR: ~2.5 min/set.',
    color: 'text-primary',
  },
  {
    number: 2,
    title: 'Guess and Move On',
    icon: SkipForward,
    description: "If you're stuck after your time limit, make an educated guess and move forward. Don't let one question derail your section.",
    detail: 'Use process of elimination before guessing to improve your odds.',
    color: 'text-warning',
  },
  {
    number: 3,
    title: 'Use Review and Edit Wisely',
    icon: CheckCircle,
    description: 'You can go back to up to 3 questions per section. Use this strategically for questions you flagged.',
    detail: 'Only use on questions where you had a specific doubt you can now resolve.',
    color: 'text-primary',
  },
  {
    number: 4,
    title: 'Finish Each Section',
    icon: Target,
    description: 'Unanswered questions hurt your score significantly. Always attempt every question, even if you must guess.',
    detail: 'A random guess has 20% chance of being correct. No answer = 0% chance.',
    color: 'text-destructive',
  },
  {
    number: 5,
    title: 'Give Each Question Equal Treatment',
    icon: Scale,
    description: "Every question is worth the same. Don't spend extra time on 'important' questions at the expense of easier ones.",
    detail: 'The test is adaptive, so difficulty will adjust to your level automatically.',
    color: 'text-primary',
  },
  {
    number: 6,
    title: 'Save Time for Last 10 Questions',
    icon: Clock,
    description: "Don't run out of time at the end. Budget so you have at least 15-20 minutes for your last 10 questions.",
    detail: 'Rushing through final questions often costs more points than you save.',
    color: 'text-warning',
  },
  {
    number: 7,
    title: 'Process of Elimination',
    icon: Target,
    description: "Even when you can't solve directly, eliminate obviously wrong answers to improve your odds.",
    detail: 'Eliminating 2 answers improves your guess from 20% to 33% success rate.',
    color: 'text-primary',
  },
  {
    number: 8,
    title: 'Maintain Focus',
    icon: Focus,
    description: 'Stay mentally present. Use the break between sections to reset, but stay in test mode.',
    detail: 'Avoid thinking about previous questions. Each question is a fresh start.',
    color: 'text-primary',
  },
  {
    number: 9,
    title: 'Read Questions Carefully',
    icon: Brain,
    description: "Many wrong answers come from misreading. Pay attention to words like 'NOT,' 'EXCEPT,' 'must be true.'",
    detail: "Underline or note key words mentally. Ask: 'What exactly is being asked?'",
    color: 'text-warning',
  },
  {
    number: 10,
    title: "Don't Sink Time into Hard Questions",
    icon: AlertTriangle,
    description: 'Recognize when a question is above your level. A quick educated guess beats 5 minutes of struggle.',
    detail: 'Your time is better spent on questions you can actually solve correctly.',
    color: 'text-destructive',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function QuickTipsPage() {
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
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary/20">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                10 Tips for Scoring Higher
              </h1>
              <p className="text-muted-foreground">
                Essential strategies for test day success
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tips Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {tips.map((tip) => (
            <motion.div key={tip.number} variants={item}>
              <Card className="glass hover-lift">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl bg-card flex items-center justify-center border ${tip.color === 'text-destructive' ? 'border-destructive/30' : tip.color === 'text-warning' ? 'border-warning/30' : 'border-primary/30'}`}>
                        <tip.icon className={`w-6 h-6 ${tip.color}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-muted-foreground">TIP #{tip.number}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {tip.description}
                      </p>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                        <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <p className="text-sm text-foreground">{tip.detail}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link to="/practice">
            <Button size="lg" className="glow-primary">
              <Zap className="w-5 h-5 mr-2" />
              Start Practicing
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
