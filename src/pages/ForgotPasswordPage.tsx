import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ArrowLeft, AlertCircle, Loader2, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const successVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'backOut' } },
};

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email.trim());
      setSuccessEmail(email.trim());
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to send reset email. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background bg-grid flex items-center justify-center px-4 py-16">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(ellipse, hsl(215 100% 28% / 0.8) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-extrabold text-foreground">
              IONOS <span className="text-primary text-glow">Exam Prep</span>
            </h1>
          </Link>
          <p className="text-muted-foreground text-sm mt-1">Cloud Foundational Certification</p>
        </div>

        <Card className="glass-strong border-primary/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-primary/15 border border-primary/20">
                <KeyRound className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold">Reset Password</CardTitle>
            </div>
            <CardDescription>
              Enter your email and we&apos;ll send you a link to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <AnimatePresence mode="wait">
              {successEmail ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  variants={successVariant}
                  initial="hidden"
                  animate="show"
                  className="text-center py-6 flex flex-col items-center gap-4"
                >
                  <div className="p-4 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                    <MailCheck className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Check your inbox</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      We&apos;ve sent a password reset link to{' '}
                      <span className="text-foreground font-medium">{successEmail}</span>. Check your
                      spam folder if you don&apos;t see it within a few minutes.
                    </p>
                  </div>
                  <Link
                    to="/login"
                    className="mt-2 inline-flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                  </Link>
                </motion.div>
              ) : (
                /* ── Form state ── */
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        disabled={isSubmitting}
                        className="bg-background/60 border-border focus-visible:ring-primary/50 placeholder:text-muted-foreground/50"
                      />
                    </div>

                    {/* Error message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
                        role="alert"
                      >
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-semibold glow-primary hover:scale-[1.02] transition-transform duration-150"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending reset email...
                        </>
                      ) : (
                        <>
                          <KeyRound className="w-4 h-4" />
                          Send Reset Email
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Back to sign in */}
                  <div className="mt-6 text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
