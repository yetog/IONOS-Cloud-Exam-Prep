import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Upload, Download, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuestions } from '@/hooks/useQuestions';
import { QuestionForm } from '@/components/QuestionForm';
import { MarkdownImporter } from '@/components/MarkdownImporter';
import { QuestionTable } from '@/components/QuestionTable';
import { Question, GMATSection } from '@/types/gmat';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { questionToMarkdown } from '@/lib/markdownParser';

export default function QuestionBankPage() {
  const { questions, customQuestions, addQuestion, removeQuestion } = useQuestions();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'import'>('list');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const customQuestionIds = useMemo(
    () => new Set(customQuestions.map((q) => q.id)),
    [customQuestions]
  );

  // Stats
  const stats = useMemo(() => {
    const bySection: Record<GMATSection, { total: number; custom: number }> = {
      quantitative: { total: 0, custom: 0 },
      verbal: { total: 0, custom: 0 },
      'integrated-reasoning': { total: 0, custom: 0 },
    };

    questions.forEach((q) => {
      bySection[q.section].total++;
      if (customQuestionIds.has(q.id)) {
        bySection[q.section].custom++;
      }
    });

    return bySection;
  }, [questions, customQuestionIds]);

  const handleSaveQuestion = (questionData: Omit<Question, 'id'>) => {
    if (editingQuestion) {
      // For editing, we remove the old and add as new (simple approach)
      removeQuestion(editingQuestion.id);
    }
    
    const newQuestion = addQuestion(questionData);
    
    toast({
      title: editingQuestion ? 'Question Updated' : 'Question Added',
      description: `Successfully ${editingQuestion ? 'updated' : 'added'} the question to your bank.`,
    });

    setEditingQuestion(null);
    setActiveTab('list');
  };

  const handleImportQuestions = (questionsData: Omit<Question, 'id'>[]) => {
    questionsData.forEach((q) => addQuestion(q));
    
    toast({
      title: 'Questions Imported',
      description: `Successfully imported ${questionsData.length} question${questionsData.length !== 1 ? 's' : ''}.`,
    });

    setActiveTab('list');
  };

  const handleDeleteQuestion = (id: string) => {
    removeQuestion(id);
    setDeleteConfirmId(null);
    
    toast({
      title: 'Question Deleted',
      description: 'The question has been removed from your bank.',
    });
  };

  const handleExport = () => {
    const exportData = customQuestions.map((q) => questionToMarkdown(q)).join('\n---\n\n');
    
    const blob = new Blob([exportData], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gmat-questions-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export Complete',
      description: `Exported ${customQuestions.length} custom questions as Markdown.`,
    });
  };

  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Database className="w-8 h-8 text-primary" />
                Question Bank
              </h1>
              <p className="text-muted-foreground">
                Manage, add, and import your GMAT questions
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{questions.length}</p>
                <p className="text-xs text-muted-foreground">Total Questions</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">{customQuestions.length}</p>
                <p className="text-xs text-muted-foreground">Custom Questions</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {stats.quantitative.total} / {stats.verbal.total} / {stats['integrated-reasoning'].total}
                </p>
                <p className="text-xs text-muted-foreground">Quant / Verbal / IR</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-4">
                <Button onClick={handleExport} disabled={customQuestions.length === 0} className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Custom
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="list">All Questions</TabsTrigger>
            <TabsTrigger value="add">
              <Plus className="w-4 h-4 mr-1" />
              Add New
            </TabsTrigger>
            <TabsTrigger value="import">
              <Upload className="w-4 h-4 mr-1" />
              Import
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <QuestionTable
              questions={questions}
              customQuestionIds={customQuestionIds}
              onEdit={(q) => {
                setEditingQuestion(q);
                setActiveTab('add');
              }}
              onDelete={(id) => setDeleteConfirmId(id)}
              onView={(q) => setViewingQuestion(q)}
            />
          </TabsContent>

          <TabsContent value="add">
            <QuestionForm
              initialData={editingQuestion || undefined}
              onSave={handleSaveQuestion}
              onCancel={() => {
                setEditingQuestion(null);
                setActiveTab('list');
              }}
            />
          </TabsContent>

          <TabsContent value="import">
            <MarkdownImporter
              onImport={handleImportQuestions}
              onClose={() => setActiveTab('list')}
            />
          </TabsContent>
        </Tabs>

        {/* View Question Dialog */}
        <Dialog open={!!viewingQuestion} onOpenChange={() => setViewingQuestion(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Question Details</DialogTitle>
              <DialogDescription>
                {viewingQuestion?.section} · {viewingQuestion?.type.split('-').join(' ')} · {viewingQuestion?.difficulty}
              </DialogDescription>
            </DialogHeader>
            {viewingQuestion && (
              <div className="space-y-4">
                {viewingQuestion.passage && (
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Passage</p>
                    <p className="text-sm whitespace-pre-wrap">{viewingQuestion.passage}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Question</p>
                  <p className="whitespace-pre-wrap">{viewingQuestion.question}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Options</p>
                  <div className="space-y-2">
                    {viewingQuestion.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded ${
                          i === viewingQuestion.correctAnswer
                            ? 'bg-primary/20 border border-primary/30'
                            : 'bg-muted/30'
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {opt}
                        {i === viewingQuestion.correctAnswer && (
                          <span className="ml-2 text-xs text-primary">(Correct)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Explanation</p>
                  <p className="text-sm whitespace-pre-wrap">{viewingQuestion.explanation}</p>
                </div>
                {viewingQuestion.strategy && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Strategy</p>
                    <p className="text-sm whitespace-pre-wrap">{viewingQuestion.strategy}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Question?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The question will be permanently removed from your question bank.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteConfirmId && handleDeleteQuestion(deleteConfirmId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
