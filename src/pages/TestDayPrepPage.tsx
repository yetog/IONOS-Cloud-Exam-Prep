import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckSquare, MapPin, Clock, Award, RefreshCw, AlertTriangle, Laptop, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const examStructure = [
  { section: 'Unit 1: Cloud Basics Reasoning', questions: 21, time: '45 min', perQ: '~2 min' },
  { section: 'Unit 2: Core Services Reasoning', questions: 23, time: '45 min', perQ: '~2 min' },
  { section: 'Data Insights', questions: 20, time: '45 min', perQ: '~2.25 min' },
];

const dayBeforeChecklist = [
  'Get a good night\'s sleep (7-8 hours minimum)',
  'Prepare your ID and confirmation email',
  'Know your test center location and plan your route',
  'Eat a balanced dinner, avoid heavy or new foods',
  'Light review only - no heavy studying',
  'Pack any allowed items (snacks for break, water)',
  'Set multiple alarms',
  'Relax and trust your preparation',
];

const testDayChecklist = [
  'Eat a nutritious breakfast with protein',
  'Arrive 30 minutes early',
  'Use the restroom before the test',
  'Take the optional 10-minute break between sections',
  'Stay calm - you\'ve prepared for this',
];

const whatToBring = [
  { item: 'Valid government-issued ID', required: true },
  { item: 'Appointment confirmation', required: true },
  { item: 'Snack for break (sealed)', required: false },
  { item: 'Water bottle', required: false },
  { item: 'Light sweater/jacket', required: false },
];

const scoreGuide = [
  { range: '705-805', percentile: '90th+', meaning: 'Exceptional - Top business schools' },
  { range: '645-705', percentile: '70-90th', meaning: 'Strong - Competitive for most programs' },
  { range: '555-645', percentile: '40-70th', meaning: 'Average - Many programs accessible' },
  { range: '205-555', percentile: '<40th', meaning: 'Below average - Consider retaking' },
];

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

export default function TestDayPrepPage() {
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
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Test Day Preparation
              </h1>
              <p className="text-muted-foreground">
                Everything you need to know for exam day
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Exam Structure */}
          <motion.div variants={item}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  GMAT Focus Edition Structure
                </CardTitle>
                <CardDescription>
                  Total test time: 2 hours 15 minutes (plus breaks)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">Section</th>
                        <th className="text-center py-3 px-2 text-sm font-semibold text-foreground">Questions</th>
                        <th className="text-center py-3 px-2 text-sm font-semibold text-foreground">Time</th>
                        <th className="text-center py-3 px-2 text-sm font-semibold text-foreground">Per Question</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examStructure.map((row, idx) => (
                        <tr key={idx} className="border-b border-border/50">
                          <td className="py-3 px-2 text-foreground">{row.section}</td>
                          <td className="py-3 px-2 text-center text-muted-foreground">{row.questions}</td>
                          <td className="py-3 px-2 text-center text-muted-foreground">{row.time}</td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="secondary">{row.perQ}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  You choose the order of sections. One 10-minute break is available between any two sections.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testing Options */}
          <motion.div variants={item}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Testing Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="center" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="center" className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Test Center
                    </TabsTrigger>
                    <TabsTrigger value="online" className="flex items-center gap-2">
                      <Laptop className="w-4 h-4" />
                      Online at Home
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="center" className="mt-4 space-y-3">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Advantages</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Controlled, quiet environment</li>
                        <li>• No technical issues to worry about</li>
                        <li>• Scratch paper provided</li>
                        <li>• Staff available for assistance</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Considerations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Must travel to test center</li>
                        <li>• Fixed appointment times</li>
                        <li>• May need to book weeks in advance</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="online" className="mt-4 space-y-3">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Advantages</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Take the test from home</li>
                        <li>• More flexible scheduling</li>
                        <li>• Familiar environment</li>
                        <li>• Available 24/7</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Quiet, private room</li>
                        <li>• Reliable internet connection</li>
                        <li>• Working webcam and microphone</li>
                        <li>• Physical whiteboard (no paper allowed)</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Checklists */}
          <motion.div variants={item} className="grid md:grid-cols-2 gap-6">
            {/* Day Before */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckSquare className="w-5 h-5 text-warning" />
                  Day Before Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {dayBeforeChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded border border-muted-foreground/30 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Test Day */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckSquare className="w-5 h-5 text-primary" />
                  Test Day Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {testDayChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded border border-muted-foreground/30 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* What to Bring */}
          <motion.div variants={item}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-primary" />
                  What to Bring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {whatToBring.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className={`w-2 h-2 rounded-full ${item.required ? 'bg-destructive' : 'bg-muted-foreground'}`} />
                      <span className="text-sm text-foreground">{item.item}</span>
                      {item.required && (
                        <Badge variant="destructive" className="ml-auto text-xs">Required</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Score Guide */}
          <motion.div variants={item}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Score Interpretation Guide
                </CardTitle>
                <CardDescription>
                  Total scores range from 205 to 805
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scoreGuide.map((score, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                      <Badge variant={idx === 0 ? 'default' : 'secondary'} className="min-w-[80px] justify-center">
                        {score.range}
                      </Badge>
                      <span className="text-sm text-muted-foreground w-20">{score.percentile}</span>
                      <span className="text-sm text-foreground">{score.meaning}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Retake Policy */}
          <motion.div variants={item}>
            <Card className="glass border-warning/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-warning" />
                  Retake Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  If you're not satisfied with your score, you can retake the GMAT:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">16-day waiting period</strong> between attempts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Maximum 5 attempts</strong> per 12-month period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Lifetime limit of 8 attempts</strong>
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground pt-2">
                  Schools see only the scores you choose to send. Use Score Preview to decide whether to keep or cancel each score.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

