import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PracticeMode from "./pages/PracticeMode";
import AchievementsPage from "./pages/AchievementsPage";
import LearnPage from "./pages/LearnPage";
import TechniqueDetailPage from "./pages/TechniqueDetailPage";
import NotesPage from "./pages/NotesPage";
import QuestionBankPage from "./pages/QuestionBankPage";
import QuickTipsPage from "./pages/QuickTipsPage";
import TestDayPrepPage from "./pages/TestDayPrepPage";
import ReferenceCardsPage from "./pages/ReferenceCardsPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/practice" element={<PracticeMode />} />
          <Route path="/practice/:section" element={<PracticeMode />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:section/:type" element={<TechniqueDetailPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/manage/questions" element={<QuestionBankPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/tips" element={<QuickTipsPage />} />
          <Route path="/test-day" element={<TestDayPrepPage />} />
          <Route path="/reference" element={<ReferenceCardsPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
