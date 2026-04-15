import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, BookOpen, Trophy, BarChart3, ArrowRight, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const features = [
  {
    icon: Dumbbell,
    title: 'Practice Mode',
    description:
      'Drill 420 real-style exam questions across all domains. Timed sessions, instant feedback, and adaptive difficulty.',
  },
  {
    icon: BookOpen,
    title: 'Study Hub',
    description:
      'Structured study guides, reference cards, and concise quick-tips mapped to every IONOS Cloud Foundational objective.',
  },
  {
    icon: Trophy,
    title: 'Achievements',
    description:
      'Unlock badges as you hit milestones. Streak bonuses, mastery tiers, and XP rewards keep you pushing forward.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Per-domain accuracy charts, weak-area detection, and a live readiness score so you always know where you stand.',
  },
];

const stats = [
  { value: '420', label: 'Practice Questions' },
  { value: '3', label: 'Exam Domains' },
  { value: '100%', label: 'Free to Start' },
];

export default function LandingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary animate-pulse text-sm tracking-widest uppercase">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-grid overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, hsl(215 100% 28% / 0.6) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 -right-60 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              'radial-gradient(circle, hsl(199 100% 44% / 0.5) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(ellipse, hsl(215 100% 28% / 0.8) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-sm font-medium tracking-wide">
            <Zap className="w-4 h-4" />
            IONOS Cloud Foundational Exam
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground leading-tight mb-6"
          >
            Ace the{' '}
            <span className="text-primary text-glow-strong">
              IONOS Cloud
            </span>{' '}
            <br className="hidden sm:block" />
            Foundational Exam
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            420 practice questions, gamified learning, and real study guides — everything you need to pass.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-6 h-auto font-semibold glow-primary hover:scale-105 transition-transform duration-200"
            >
              <Link to="/register">
                Start for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-6 h-auto font-semibold border-border hover:border-primary/60 hover:bg-primary/10 transition-all duration-200"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-8 sm:gap-12"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold text-primary text-glow mb-1">
                  {value}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Learn more
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="relative z-10 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={item} className="h-full">
                <Card className="glass hover-lift h-full group cursor-default">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="p-3 rounded-xl bg-primary/15 border border-primary/20 w-fit group-hover:bg-primary/25 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">
                        {title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative z-10 px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <Card className="glass-strong border-primary/30 overflow-hidden">
              <CardContent className="p-10 text-center relative">
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, hsl(215 100% 28%) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/15 border border-primary/30">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    Ready to pass on your{' '}
                    <span className="text-primary text-glow">first attempt?</span>
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                    Join now and start your structured 3-day cram strategy. Track every question, every domain, every point of progress.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="px-10 py-6 h-auto text-base font-semibold glow-primary hover:scale-105 transition-transform duration-200"
                    >
                      <Link to="/register">
                        Start for Free
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="lg"
                      className="px-10 py-6 h-auto text-base font-semibold hover:bg-primary/10 transition-colors duration-200"
                    >
                      <Link to="/login">Already have an account?</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 py-8 px-4 text-center">
        <p className="text-xs text-muted-foreground tracking-wide">
          IONOS Cloud Exam Prep &mdash; Built to help you pass.
        </p>
      </footer>
    </div>
  );
}
