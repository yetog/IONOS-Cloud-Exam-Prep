import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function LoginPage() {
  const { user, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(email.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Sign in failed. Please check your credentials and try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary animate-pulse text-sm tracking-widest uppercase">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-grid flex items-center justify-center px-4 py-16">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-15"
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
                <LogIn className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold">Sign In</CardTitle>
            </div>
            <CardDescription>Welcome back. Continue your exam preparation.</CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
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

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    disabled={isSubmitting}
                    className="bg-background/60 border-border focus-visible:ring-primary/50 placeholder:text-muted-foreground/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Register link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="text-primary font-medium hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
