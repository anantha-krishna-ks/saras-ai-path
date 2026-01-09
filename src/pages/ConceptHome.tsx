import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen, PlayCircle, Layers, AlertTriangle, ChevronRight } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

interface LearningMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  recommended: boolean;
  duration: string;
}

const learningModes: LearningMode[] = [
  {
    id: "comic",
    name: "Visual Story",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Learn through an engaging illustrated story",
    recommended: true,
    duration: "8 min",
  },
  {
    id: "video",
    name: "Video Explanation",
    icon: <PlayCircle className="w-5 h-5" />,
    description: "Watch a clear video breakdown of the concept",
    recommended: false,
    duration: "6 min",
  },
  {
    id: "activity",
    name: "Interactive Activity",
    icon: <Layers className="w-5 h-5" />,
    description: "Explore through hands-on simulations",
    recommended: true,
    duration: "10 min",
  },
];

const ConceptHome = () => {
  const navigate = useNavigate();
  const { conceptId } = useParams();

  const handleStartLearning = () => {
    navigate(`/learn/${conceptId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Map</span>
          </button>
          <BrandLogo />
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Concept Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-border/50 shadow-sm p-8 mb-6"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-3xl">⚡</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Physics • Chapter 3
                </span>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Has tricky parts
                </span>
              </div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Newton's First Law of Motion
              </h1>
              <p className="text-muted-foreground">
                Also known as the Law of Inertia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-border/50 pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>~20 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>3 learning modes</span>
            </div>
          </div>
        </motion.div>

        {/* What You'll Learn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">What you'll understand</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary text-sm font-semibold">1</span>
              </div>
              <p className="text-muted-foreground">
                Why objects at rest tend to stay at rest, and objects in motion tend to stay in motion
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary text-sm font-semibold">2</span>
              </div>
              <p className="text-muted-foreground">
                What "inertia" means and how it affects everything around us
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary text-sm font-semibold">3</span>
              </div>
              <p className="text-muted-foreground">
                Real-world examples: seatbelts, tablecloth trick, and more
              </p>
            </div>
          </div>
        </motion.div>

        {/* Learning Modes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-border/50 shadow-sm p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Choose how to learn</h2>
          <p className="text-sm text-muted-foreground mb-4">
            We recommend starting with the highlighted modes based on your learning style.
          </p>
          <div className="space-y-3">
            {learningModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                  mode.recommended
                    ? "border-primary/30 bg-primary/5"
                    : "border-border hover:border-primary/20"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  mode.recommended ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{mode.name}</h3>
                    {mode.recommended && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{mode.description}</p>
                </div>
                <span className="text-sm text-muted-foreground">{mode.duration}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <button
            onClick={handleStartLearning}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Learning
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default ConceptHome;
