import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Lightbulb, AlertCircle, FileText, 
  Tag, Trash2, Edit3, X, Filter
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNotes } from '@/hooks/useNotes';
import { SECTION_INFO, GMATSection, QuestionType } from '@/types/gmat';
import { UserNote } from '@/types/notes';
import { cn } from '@/lib/utils';

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

const noteTypeConfig = {
  insight: { icon: Lightbulb, label: 'Insight', color: 'text-primary bg-primary/10' },
  mistake: { icon: AlertCircle, label: 'Mistake', color: 'text-destructive bg-destructive/10' },
  general: { icon: FileText, label: 'General', color: 'text-muted-foreground bg-muted' },
};

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote, getFilteredNotes, getAllTags } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<GMATSection | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<UserNote['type'] | 'all'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<UserNote | null>(null);

  const filteredNotes = useMemo(() => {
    return getFilteredNotes({
      section: sectionFilter !== 'all' ? sectionFilter : undefined,
      type: typeFilter !== 'all' ? typeFilter : undefined,
      searchQuery: searchQuery || undefined,
    });
  }, [getFilteredNotes, sectionFilter, typeFilter, searchQuery]);

  const handleAddNote = (noteData: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    addNote(noteData);
    setIsAddDialogOpen(false);
  };

  const handleUpdateNote = (noteData: Partial<Omit<UserNote, 'id' | 'createdAt'>>) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
      setEditingNote(null);
    }
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Notes & <span className="text-primary text-glow">Insights</span>
              </h1>
              <p className="text-muted-foreground">
                Capture your learnings, track mistakes, and build your personal knowledge base.
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 glow-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Add New Note</DialogTitle>
                </DialogHeader>
                <NoteForm onSubmit={handleAddNote} onCancel={() => setIsAddDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sectionFilter} onValueChange={(v) => setSectionFilter(v as GMATSection | 'all')}>
              <SelectTrigger className="w-40 bg-secondary border-border">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {Object.entries(SECTION_INFO).map(([key, info]) => (
                  <SelectItem key={key} value={key}>{info.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as UserNote['type'] | 'all')}>
              <SelectTrigger className="w-32 bg-secondary border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="insight">Insights</SelectItem>
                <SelectItem value="mistake">Mistakes</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Notes List */}
        {filteredNotes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {notes.length === 0 ? 'No notes yet' : 'No matching notes'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {notes.length === 0 
                ? 'Start capturing your insights and learnings'
                : 'Try adjusting your filters'}
            </p>
            {notes.length === 0 && (
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Note
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {filteredNotes.map((note) => (
              <motion.div key={note.id} variants={item}>
                <NoteCard
                  note={note}
                  onEdit={() => setEditingNote(note)}
                  onDelete={() => deleteNote(note.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingNote} onOpenChange={(open) => !open && setEditingNote(null)}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            {editingNote && (
              <NoteForm
                initialData={editingNote}
                onSubmit={handleUpdateNote}
                onCancel={() => setEditingNote(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

interface NoteCardProps {
  note: UserNote;
  onEdit: () => void;
  onDelete: () => void;
}

function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const config = noteTypeConfig[note.type];
  const Icon = config.icon;

  return (
    <Card className="glass hover-lift group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={cn("inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full", config.color)}>
                <Icon className="w-3 h-3" />
                {config.label}
              </span>
              {note.section && (
                <Badge variant="secondary" className="text-xs">
                  {SECTION_INFO[note.section]?.name || note.section}
                </Badge>
              )}
            </div>
            <h3 className="font-medium text-foreground mb-2 truncate">{note.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap">
              {note.content}
            </p>
            {note.tags.length > 0 && (
              <div className="flex items-center gap-1 mt-3 flex-wrap">
                <Tag className="w-3 h-3 text-muted-foreground" />
                {note.tags.map(tag => (
                  <span key={tag} className="text-xs text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-3">
          {new Date(note.updatedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}

interface NoteFormProps {
  initialData?: UserNote;
  onSubmit: (data: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

function NoteForm({ initialData, onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [type, setType] = useState<UserNote['type']>(initialData?.type || 'insight');
  const [section, setSection] = useState<GMATSection | ''>(initialData?.section || '');
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    onSubmit({
      title,
      content,
      type,
      section: section || undefined,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="bg-secondary border-border"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">Content</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          className="bg-secondary border-border min-h-32"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Type</label>
          <Select value={type} onValueChange={(v) => setType(v as UserNote['type'])}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="insight">Insight</SelectItem>
              <SelectItem value="mistake">Mistake</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Section (optional)</label>
          <Select value={section} onValueChange={(v) => setSection(v as GMATSection | '')}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No section</SelectItem>
              {Object.entries(SECTION_INFO).map(([key, info]) => (
                <SelectItem key={key} value={key}>{info.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">Tags (comma separated)</label>
        <Input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="e.g., geometry, time-management, aha-moment"
          className="bg-secondary border-border"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          {initialData ? 'Update' : 'Add'} Note
        </Button>
      </div>
    </form>
  );
}
