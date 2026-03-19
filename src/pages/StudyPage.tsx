import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

// @ts-ignore
import cramStrategyRaw from '@/data/markdown/cram-strategy.md?raw';
// @ts-ignore
import unit1Raw from '@/data/markdown/unit1.md?raw';
// @ts-ignore
import unit2Raw from '@/data/markdown/unit2.md?raw';
// @ts-ignore
import unit3Raw from '@/data/markdown/unit3.md?raw';
// @ts-ignore
import funFactsRaw from '@/data/markdown/fun-facts.md?raw';
// @ts-ignore
import tacticsRaw from '@/data/markdown/tactics.md?raw';
// @ts-ignore
import flashcardsRaw from '@/data/markdown/flashcards.md?raw';

const MARKDOWN_MAP: Record<string, { title: string; content: string }> = {
  'cram-strategy': { title: '3-Day Cram Strategy', content: cramStrategyRaw },
  'unit1': { title: 'Unit 1: Cloud Basics', content: unit1Raw },
  'unit2': { title: 'Unit 2: Core Services', content: unit2Raw },
  'unit3': { title: 'Unit 3: Management', content: unit3Raw },
  'fun-facts': { title: 'High-IQ Fun Facts', content: funFactsRaw },
  'tactics': { title: 'Exam Tactics & Tricky Questions', content: tacticsRaw },
  'flashcards': { title: 'Ultimate Cram Tables', content: flashcardsRaw },
};

export default function StudyPage() {
  const { documentId } = useParams<{ documentId: string }>();
  
  const doc = useMemo(() => {
    if (documentId && MARKDOWN_MAP[documentId]) {
      return MARKDOWN_MAP[documentId];
    }
    return null;
  }, [documentId]);

  if (documentId === 'guides') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl py-12 px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-6 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-8">Study Guides</h1>
          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/study/unit1">
              <div className="p-6 border border-border rounded-lg bg-card hover:border-primary transition-colors">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold">Unit 1: Cloud Basics</h2>
              </div>
            </Link>
            <Link to="/study/unit2">
              <div className="p-6 border border-border rounded-lg bg-card hover:border-primary transition-colors">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold">Unit 2: Core Services</h2>
              </div>
            </Link>
            <Link to="/study/unit3">
              <div className="p-6 border border-border rounded-lg bg-card hover:border-primary transition-colors">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-xl font-semibold">Unit 3: Management</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
          <Link to="/">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
            </Button>
          </Link>
          <h1 className="text-lg font-semibold truncate px-4">{doc.title}</h1>
          <div className="w-24 {/* Spacer for centering */}"></div> 
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container max-w-4xl py-8 px-4 sm:px-6 md:px-8"
      >
        <div className="prose prose-invert prose-blue max-w-none 
            prose-headings:text-foreground prose-h1:text-3xl prose-h2:text-primary prose-h2:border-b prose-h2:border-border prose-h2:pb-2
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:text-muted-foreground prose-ol:text-muted-foreground
            prose-li:marker:text-primary
            prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-muted prose-pre:border prose-pre:border-border
            prose-table:border-collapse prose-th:bg-muted/50 prose-th:p-3 prose-th:text-left prose-td:p-3 prose-td:border-t prose-td:border-border
            prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {doc.content}
          </ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
}
