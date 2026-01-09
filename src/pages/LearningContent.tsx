import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, PlayCircle, Layers, CreditCard, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import HardSpotIntervention from "@/components/learning/HardSpotIntervention";
import EmbeddedAssessment from "@/components/learning/EmbeddedAssessment";

type ContentMode = "comic" | "video" | "activity" | "flashcards";

interface ContentSlide {
  id: number;
  type: "text" | "image" | "interactive";
  title: string;
  content: string;
  imageUrl?: string;
}

const comicSlides: ContentSlide[] = [
  {
    id: 1,
    type: "text",
    title: "The Bus Ride",
    content: "Imagine you're standing on a bus. The bus is stationary at a red light. You're standing perfectly still, not holding anything...",
  },
  {
    id: 2,
    type: "text",
    title: "Sudden Start!",
    content: "Suddenly, the bus starts moving forward. What happens to you? You stumble backward! But why? The bus moved, but your body wanted to stay where it was.",
  },
  {
    id: 3,
    type: "text",
    title: "This is Inertia",
    content: "Your body resisted the change in motion. This resistance to change is called INERTIA. Objects at rest want to stay at rest!",
  },
  {
    id: 4,
    type: "text",
    title: "The Other Side",
    content: "Now imagine the bus suddenly brakes. You lurch forward! Your body was moving with the bus and wanted to keep moving. Objects in motion want to stay in motion!",
  },
  {
    id: 5,
    type: "text",
    title: "Newton's First Law",
    content: "This is Newton's First Law: An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.",
  },
];

const LearningContent = () => {
  const navigate = useNavigate();
  const { conceptId } = useParams();
  const [activeMode, setActiveMode] = useState<ContentMode>("comic");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHardSpot, setShowHardSpot] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [completedSlides, setCompletedSlides] = useState<number[]>([]);

  const modes = [
    { id: "comic" as ContentMode, name: "Story", icon: BookOpen },
    { id: "video" as ContentMode, name: "Video", icon: PlayCircle },
    { id: "activity" as ContentMode, name: "Activity", icon: Layers },
    { id: "flashcards" as ContentMode, name: "Cards", icon: CreditCard },
  ];

  const handleNext = () => {
    if (currentSlide < comicSlides.length - 1) {
      if (!completedSlides.includes(currentSlide)) {
        setCompletedSlides([...completedSlides, currentSlide]);
      }
      setCurrentSlide(currentSlide + 1);
    } else {
      // Trigger hard spot check after content
      if (!completedSlides.includes(currentSlide)) {
        setCompletedSlides([...completedSlides, currentSlide]);
      }
      setShowHardSpot(true);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleHardSpotComplete = (needsIntervention: boolean) => {
    setShowHardSpot(false);
    if (!needsIntervention) {
      setShowAssessment(true);
    }
  };

  const handleAssessmentComplete = () => {
    setShowAssessment(false);
    navigate(`/reflection/${conceptId}`);
  };

  const progress = ((completedSlides.length) / comicSlides.length) * 100;

  if (showHardSpot) {
    return <HardSpotIntervention onComplete={handleHardSpotComplete} />;
  }

  if (showAssessment) {
    return <EmbeddedAssessment onComplete={handleAssessmentComplete} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Exit</span>
          </button>
          <BrandLogo />
          <div className="text-sm text-muted-foreground">
            {Math.round(progress)}% complete
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Main Content Area */}
        <main className="flex-1 max-w-4xl mx-auto px-6 py-8">
          {/* Mode Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-8"
          >
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeMode === mode.id
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <mode.icon className="w-4 h-4" />
                {mode.name}
              </button>
            ))}
          </motion.div>

          {/* Content Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-border/50 shadow-sm p-8 min-h-[400px] flex flex-col"
            >
              {activeMode === "comic" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">
                      Panel {currentSlide + 1} of {comicSlides.length}
                    </span>
                    <div className="flex items-center gap-1">
                      {comicSlides.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentSlide
                              ? "bg-primary w-6"
                              : completedSlides.includes(index)
                              ? "bg-green-500"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-8 mb-6">
                      <h2 className="text-2xl font-semibold text-foreground mb-4">
                        {comicSlides[currentSlide].title}
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {comicSlides[currentSlide].content}
                      </p>
                    </div>

                    {/* Visual placeholder */}
                    <div className="h-48 bg-muted/50 rounded-xl flex items-center justify-center">
                      <span className="text-6xl">
                        {currentSlide === 0 && "🚌"}
                        {currentSlide === 1 && "😮"}
                        {currentSlide === 2 && "💡"}
                        {currentSlide === 3 && "🛑"}
                        {currentSlide === 4 && "⚖️"}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {activeMode === "video" && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <PlayCircle className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Video Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Try the Story mode for now — it's just as engaging!
                    </p>
                  </div>
                </div>
              )}

              {activeMode === "activity" && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Layers className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Activity</h3>
                    <p className="text-muted-foreground">
                      Coming soon! Explore the Story mode first.
                    </p>
                  </div>
                </div>
              )}

              {activeMode === "flashcards" && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Flashcards</h3>
                    <p className="text-muted-foreground">
                      Available after completing the main content!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {activeMode === "comic" && (
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentSlide === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentSlide === 0
                    ? "text-muted-foreground cursor-not-allowed"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-200"
              >
                {currentSlide === comicSlides.length - 1 ? "Continue to Check" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>

        {/* Right Sidebar - Progress */}
        <aside className="hidden lg:block w-64 border-l border-border/50 bg-white/50 p-6">
          <h3 className="font-semibold text-foreground mb-4">Your Progress</h3>
          <div className="space-y-3">
            {comicSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                  index === currentSlide
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  completedSlides.includes(index)
                    ? "bg-green-500 text-white"
                    : index === currentSlide
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {completedSlides.includes(index) ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`text-sm ${
                  index === currentSlide ? "text-foreground font-medium" : "text-muted-foreground"
                }`}>
                  {slide.title}
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LearningContent;
