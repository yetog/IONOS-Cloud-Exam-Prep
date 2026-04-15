import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Zap, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Study guides — statically imported as raw text via Vite
import unit1Guide from '../../Study_Guides/unit1_study_guide.md?raw';
import unit2Guide from '../../Study_Guides/unit2_study_guide.md?raw';
import unit3Guide from '../../Study_Guides/unit3_study_guide.md?raw';

// Cheat sheets — statically imported as raw text via Vite
import cramTables from '../../Cheat_Sheets/ultimate_cram_tables.md?raw';
import examStrategy from '../../Cheat_Sheets/exam_strategy_and_details.md?raw';
import examTactics from '../../Cheat_Sheets/exam_tactics_and_tricky_questions.md?raw';
import cramStrategy from '../../Cheat_Sheets/3_day_cram_strategy.md?raw';
import funFacts from '../../Cheat_Sheets/high_iq_fun_facts.md?raw';

const studyGuides = [
  { id: 'unit1', label: 'Unit 1: Cloud Basics', content: unit1Guide },
  { id: 'unit2', label: 'Unit 2: Core Services', content: unit2Guide },
  { id: 'unit3', label: 'Unit 3: Management', content: unit3Guide },
];

const cheatSheets = [
  { id: 'tables', label: 'Cram Tables', content: cramTables },
  { id: 'strategy', label: 'Exam Strategy', content: examStrategy },
  { id: 'tactics', label: 'Exam Tactics', content: examTactics },
  { id: 'cram', label: '3-Day Cram Plan', content: cramStrategy },
  { id: 'facts', label: 'High-IQ Facts', content: funFacts },
];

export default function LearnPage() {
  const [activeGuide, setActiveGuide] = useState('unit1');
  const [activeSheet, setActiveSheet] = useState('tables');

  const activeGuideContent = studyGuides.find(g => g.id === activeGuide)?.content ?? '';
  const activeSheetContent = cheatSheets.find(s => s.id === activeSheet)?.content ?? '';

  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
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
            Study <span className="text-primary text-glow">Hub</span>
          </h1>
          <p className="text-muted-foreground">
            Everything you need to pass the IONOS Cloud Foundational exam — study guides, cram tables, and exam tactics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="guides" className="w-full">
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Study Guides
              </TabsTrigger>
              <TabsTrigger value="cheatsheets" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Cheat Sheets
              </TabsTrigger>
            </TabsList>

            {/* ── Study Guides Tab ── */}
            <TabsContent value="guides">
              <div className="flex flex-wrap gap-2 mb-6">
                {studyGuides.map(g => (
                  <Button
                    key={g.id}
                    variant={activeGuide === g.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveGuide(g.id)}
                  >
                    <FileText className="w-3.5 h-3.5 mr-1.5" />
                    {g.label}
                  </Button>
                ))}
              </div>
              <Card className="glass">
                <CardContent className="p-6 md:p-10">
                  <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-th:text-foreground prose-td:text-muted-foreground prose-code:text-primary prose-a:text-primary prose-hr:border-border prose-blockquote:border-primary/50">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {activeGuideContent}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── Cheat Sheets Tab ── */}
            <TabsContent value="cheatsheets">
              <div className="flex flex-wrap gap-2 mb-6">
                {cheatSheets.map(s => (
                  <Button
                    key={s.id}
                    variant={activeSheet === s.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveSheet(s.id)}
                  >
                    <Zap className="w-3.5 h-3.5 mr-1.5" />
                    {s.label}
                  </Button>
                ))}
              </div>
              <Card className="glass">
                <CardContent className="p-6 md:p-10">
                  <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-th:text-foreground prose-td:text-muted-foreground prose-code:text-primary prose-a:text-primary prose-hr:border-border prose-blockquote:border-primary/50">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {activeSheetContent}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
