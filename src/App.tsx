import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SubjectChapters from "./pages/SubjectChapters";
import LearningReadiness from "./pages/LearningReadiness";
import ConceptMap from "./pages/ConceptMap";
import ConceptHome from "./pages/ConceptHome";
import LearningContent from "./pages/LearningContent";
import Reflection from "./pages/Reflection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subject/:subjectId" element={<SubjectChapters />} />
          <Route path="/readiness/:subjectId" element={<LearningReadiness />} />
          <Route path="/concept-map/:subjectId" element={<ConceptMap />} />
          <Route path="/concept/:conceptId" element={<ConceptHome />} />
          <Route path="/learn/:conceptId" element={<LearningContent />} />
          <Route path="/reflection/:conceptId" element={<Reflection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
