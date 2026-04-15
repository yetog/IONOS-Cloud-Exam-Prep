import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Eye, EyeOff, AlertCircle, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function RegisterPage() {
  const { user, loading: authLoading, signUp } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  function validate(): string {
    if (!displayName.trim()) return 'Display name is required.';
    if (displayName.trim().length < 2) return 'Display name must be at least 2 characters.';
    if (!email.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.';
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (!confirmPassword) return 'Please confirm your password.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return '';
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(email.trim(), password, displayName.trim());
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearError() {
    if (error) setError('');
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
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-15"
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
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold">Create Account</CardTitle>
            </div>
            <CardDescription>Start your free exam preparation today.</CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-sm font-medium text-foreground">
                  Display name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e) => { setDisplayName(e.target.value); clearError(); }}
                    disabled={isSubmitting}
                    className="pl-9 bg-background/60 border-border focus-visible:ring-primary/50 placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

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
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  disabled={isSubmitting}
                  className="bg-background/60 border-border focus-visible:ring-primary/50 placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearError(); }}
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
                    disabled={isSubmitting}
                    className="bg-background/60 border-border focus-visible:ring-primary/50 placeholder:text-muted-foreground/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password match indicator */}
              {confirmPassword.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-xs flex items-center gap-1.5 ${
                    password === confirmPassword ? 'text-emerald-400' : 'text-destructive'
                  }`}
                >
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      password === confirmPassword ? 'bg-emerald-400' : 'bg-destructive'
                    }`}
                  />
                  {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                </motion.p>
              )}

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
                className="w-full h-11 text-base font-semibold mt-2 glow-primary hover:scale-[1.02] transition-transform duration-150"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            {/* Sign in link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary font-medium hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
