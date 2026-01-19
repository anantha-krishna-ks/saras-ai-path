import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  PlayCircle, 
  Layers, 
  CreditCard,
  CheckCircle2
} from "lucide-react";

type ContentMode = "comic" | "video" | "activity" | "flashcards";

interface ContentSlide {
  id: number;
  type: "text" | "image" | "interactive";
  title: string;
  content: string;
  imageUrl?: string;
}

interface FullscreenLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ContentMode;
  slides: ContentSlide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  completedSlides: number[];
  onComplete: () => void;
}

const FullscreenLearningModal = ({
  isOpen,
  onClose,
  mode,
  slides,
  currentSlide,
  onSlideChange,
  completedSlides,
  onComplete,
}: FullscreenLearningModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentSlide]);

  // Toggle browser fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log("Fullscreen not supported");
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      onSlideChange(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      onSlideChange(currentSlide - 1);
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case "comic": return <BookOpen className="w-5 h-5" />;
      case "video": return <PlayCircle className="w-5 h-5" />;
      case "activity": return <Layers className="w-5 h-5" />;
      case "flashcards": return <CreditCard className="w-5 h-5" />;
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case "comic": return "Story Mode";
      case "video": return "Video Mode";
      case "activity": return "Activity Mode";
      case "flashcards": return "Flashcards Mode";
    }
  };

  const getSlideEmoji = (index: number) => {
    const emojis = ["🚌", "😮", "💡", "🛑", "⚖️"];
    return emojis[index] || "📚";
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background"
      >
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            {/* Left: Close button and mode label */}
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors"
                aria-label="Close fullscreen"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                {getModeIcon()}
                <span className="text-sm font-medium">{getModeLabel()}</span>
              </div>
            </div>

            {/* Center: Slide indicator (mobile) / Progress dots (desktop) */}
            <div className="flex items-center gap-2">
              <span className="sm:hidden text-sm font-medium text-foreground">
                {currentSlide + 1} / {slides.length}
              </span>
              <div className="hidden sm:flex items-center gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onSlideChange(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      index === currentSlide
                        ? "bg-primary w-6"
                        : completedSlides.includes(index)
                        ? "bg-green-500"
                        : "bg-muted hover:bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-foreground" />
              ) : (
                <Maximize2 className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-muted">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="h-full pt-16 sm:pt-20 pb-24 sm:pb-28 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                {mode === "comic" && slides[currentSlide] && (
                  <>
                    {/* Visual emoji - larger on desktop */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 sm:mb-8"
                    >
                      <span className="text-6xl sm:text-7xl lg:text-8xl">
                        {getSlideEmoji(currentSlide)}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6"
                    >
                      {slides[currentSlide].title}
                    </motion.h2>

                    {/* Content */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg sm:text-xl lg:text-2xl text-muted-foreground text-center leading-relaxed max-w-2xl"
                    >
                      {slides[currentSlide].content}
                    </motion.p>
                  </>
                )}

                {mode === "video" && (
                  <div className="text-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                      <PlayCircle className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">Video Coming Soon</h3>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      Try the Story mode for now — it's just as engaging!
                    </p>
                  </div>
                )}

                {mode === "activity" && (
                  <div className="text-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                      <Layers className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">Interactive Activity</h3>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      Coming soon! Explore the Story mode first.
                    </p>
                  </div>
                )}

                {mode === "flashcards" && (
                  <div className="text-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                      <CreditCard className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">Flashcards</h3>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      Available after completing the main content!
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer Navigation */}
        <footer className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/50 px-4 sm:px-6 py-4 sm:py-5">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all duration-200 ${
                currentSlide === 0
                  ? "text-muted-foreground cursor-not-allowed opacity-50"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Mobile slide dots */}
            <div className="flex sm:hidden items-center gap-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onSlideChange(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "bg-primary w-4"
                      : completedSlides.includes(index)
                      ? "bg-green-500"
                      : "bg-muted"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm"
            >
              <span>
                {currentSlide === slides.length - 1 ? "Complete" : "Next"}
              </span>
              {currentSlide === slides.length - 1 ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </footer>

        {/* Keyboard shortcuts hint (desktop only) */}
        <div className="hidden lg:flex absolute bottom-20 left-1/2 -translate-x-1/2 items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">→</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">ESC</kbd>
            Close
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FullscreenLearningModal;
