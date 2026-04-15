import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Dashboard from "./pages/Dashboard";

// App pages — lazy loaded
const PracticeMode        = lazy(() => import("./pages/PracticeMode"));
const AchievementsPage    = lazy(() => import("./pages/AchievementsPage"));
const LearnPage           = lazy(() => import("./pages/LearnPage"));
const TechniqueDetailPage = lazy(() => import("./pages/TechniqueDetailPage"));
const NotesPage           = lazy(() => import("./pages/NotesPage"));
const QuestionBankPage    = lazy(() => import("./pages/QuestionBankPage"));
const QuickTipsPage       = lazy(() => import("./pages/QuickTipsPage"));
const TestDayPrepPage     = lazy(() => import("./pages/TestDayPrepPage"));
const ReferenceCardsPage  = lazy(() => import("./pages/ReferenceCardsPage"));
const AboutPage           = lazy(() => import("./pages/AboutPage"));
const ProfilePage         = lazy(() => import("./pages/ProfilePage"));
const SkillsPage          = lazy(() => import("./pages/SkillsPage"));
const StudyPage           = lazy(() => import("./pages/StudyPage"));
const NotFound            = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const fallback = (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-primary animate-pulse text-sm tracking-widest uppercase">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/ionos-exam">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/*"
            element={
              <Layout>
                <ErrorBoundary>
                  <Suspense fallback={fallback}>
                    <Routes>
                      <Route path="/dashboard"              element={<Dashboard />} />
                      <Route path="/practice"               element={<PracticeMode />} />
                      <Route path="/practice/:section"      element={<PracticeMode />} />
                      <Route path="/learn"                  element={<LearnPage />} />
                      <Route path="/learn/:section/:type"   element={<TechniqueDetailPage />} />
                      <Route path="/notes"                  element={<NotesPage />} />
                      <Route path="/manage/questions"       element={<QuestionBankPage />} />
                      <Route path="/achievements"           element={<AchievementsPage />} />
                      <Route path="/tips"                   element={<QuickTipsPage />} />
                      <Route path="/test-day"               element={<TestDayPrepPage />} />
                      <Route path="/reference"              element={<ReferenceCardsPage />} />
                      <Route path="/about"                  element={<AboutPage />} />
                      <Route path="/profile"                element={<ProfilePage />} />
                      <Route path="/skills"                 element={<SkillsPage />} />
                      <Route path="/study/:documentId"      element={<StudyPage />} />
                      <Route path="*"                       element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
