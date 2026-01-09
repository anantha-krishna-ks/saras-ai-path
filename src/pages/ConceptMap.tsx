import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Lock, CheckCircle2, AlertTriangle, ChevronRight, Info } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

interface ConceptNode {
  id: string;
  title: string;
  shortTitle: string;
  status: "completed" | "current" | "locked" | "available";
  difficulty: "easy" | "medium" | "hard";
  hasHardSpot: boolean;
  prerequisites: string[];
  position: { x: number; y: number };
}

const concepts: ConceptNode[] = [
  {
    id: "motion-basics",
    title: "What is Motion?",
    shortTitle: "Motion Basics",
    status: "completed",
    difficulty: "easy",
    hasHardSpot: false,
    prerequisites: [],
    position: { x: 50, y: 20 },
  },
  {
    id: "speed-velocity",
    title: "Speed and Velocity",
    shortTitle: "Speed & Velocity",
    status: "completed",
    difficulty: "easy",
    hasHardSpot: false,
    prerequisites: ["motion-basics"],
    position: { x: 30, y: 35 },
  },
  {
    id: "acceleration",
    title: "Understanding Acceleration",
    shortTitle: "Acceleration",
    status: "completed",
    difficulty: "medium",
    hasHardSpot: false,
    prerequisites: ["speed-velocity"],
    position: { x: 70, y: 35 },
  },
  {
    id: "first-law",
    title: "Newton's First Law (Inertia)",
    shortTitle: "First Law",
    status: "current",
    difficulty: "medium",
    hasHardSpot: true,
    prerequisites: ["acceleration"],
    position: { x: 50, y: 50 },
  },
  {
    id: "second-law",
    title: "Newton's Second Law (F=ma)",
    shortTitle: "Second Law",
    status: "available",
    difficulty: "hard",
    hasHardSpot: true,
    prerequisites: ["first-law"],
    position: { x: 30, y: 65 },
  },
  {
    id: "third-law",
    title: "Newton's Third Law (Action-Reaction)",
    shortTitle: "Third Law",
    status: "locked",
    difficulty: "medium",
    hasHardSpot: false,
    prerequisites: ["second-law"],
    position: { x: 70, y: 65 },
  },
  {
    id: "friction",
    title: "Friction and Its Types",
    shortTitle: "Friction",
    status: "locked",
    difficulty: "medium",
    hasHardSpot: true,
    prerequisites: ["first-law", "second-law"],
    position: { x: 50, y: 80 },
  },
];

const ConceptMap = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode | null>(null);

  const getStatusStyles = (status: ConceptNode["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500 border-green-500 text-white";
      case "current":
        return "bg-primary border-primary text-white ring-4 ring-primary/20";
      case "available":
        return "bg-white border-primary/50 text-foreground hover:border-primary";
      case "locked":
        return "bg-muted border-border text-muted-foreground opacity-60";
    }
  };

  const getDifficultyLabel = (difficulty: ConceptNode["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return { label: "Easy", color: "text-green-600 bg-green-50" };
      case "medium":
        return { label: "Medium", color: "text-amber-600 bg-amber-50" };
      case "hard":
        return { label: "Challenging", color: "text-red-600 bg-red-50" };
    }
  };

  const handleConceptClick = (concept: ConceptNode) => {
    if (concept.status === "locked") return;
    setSelectedConcept(concept);
  };

  const navigateToConcept = () => {
    if (selectedConcept && selectedConcept.status !== "locked") {
      navigate(`/concept/${selectedConcept.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <BrandLogo />
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Newton's Laws of Motion
          </h1>
          <p className="text-muted-foreground">
            Explore the concepts below. Complete them in order to unlock new ones.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-primary ring-2 ring-primary/20" />
            <span className="text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full border-2 border-primary/50 bg-white" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-muted border border-border opacity-60" />
            <span className="text-muted-foreground">Locked</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-muted-foreground">Has tricky parts</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Concept Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-border/50 p-6 min-h-[500px] relative"
          >
            {/* Connection Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--border))" />
                </marker>
              </defs>
              {/* Lines connecting concepts */}
              <line x1="50%" y1="23%" x2="30%" y2="32%" stroke="hsl(var(--border))" strokeWidth="2" />
              <line x1="50%" y1="23%" x2="70%" y2="32%" stroke="hsl(var(--border))" strokeWidth="2" />
              <line x1="30%" y1="38%" x2="50%" y2="47%" stroke="hsl(var(--border))" strokeWidth="2" />
              <line x1="70%" y1="38%" x2="50%" y2="47%" stroke="hsl(var(--border))" strokeWidth="2" />
              <line x1="50%" y1="53%" x2="30%" y2="62%" stroke="hsl(var(--border))" strokeWidth="2" />
              <line x1="50%" y1="53%" x2="70%" y2="62%" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="4" />
              <line x1="30%" y1="68%" x2="50%" y2="77%" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="4" />
              <line x1="70%" y1="68%" x2="50%" y2="77%" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="4" />
            </svg>

            {/* Concept Nodes */}
            <div className="relative h-full" style={{ minHeight: "450px" }}>
              {concepts.map((concept, index) => (
                <motion.button
                  key={concept.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => handleConceptClick(concept)}
                  onMouseEnter={() => setHoveredConcept(concept.id)}
                  onMouseLeave={() => setHoveredConcept(null)}
                  disabled={concept.status === "locked"}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${getStatusStyles(
                    concept.status
                  )} ${concept.status !== "locked" ? "cursor-pointer hover:shadow-md" : "cursor-not-allowed"} ${
                    selectedConcept?.id === concept.id ? "ring-4 ring-primary/30" : ""
                  }`}
                  style={{
                    left: `${concept.position.x}%`,
                    top: `${concept.position.y}%`,
                    zIndex: hoveredConcept === concept.id || selectedConcept?.id === concept.id ? 10 : 1,
                  }}
                >
                  {concept.status === "completed" && <CheckCircle2 className="w-4 h-4" />}
                  {concept.status === "locked" && <Lock className="w-4 h-4" />}
                  <span className="font-medium text-sm whitespace-nowrap">{concept.shortTitle}</span>
                  {concept.hasHardSpot && concept.status !== "completed" && (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Concept Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-border/50 p-6"
          >
            {selectedConcept ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedConcept.title}
                    </h3>
                    {selectedConcept.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyLabel(selectedConcept.difficulty).color}`}>
                      {getDifficultyLabel(selectedConcept.difficulty).label}
                    </span>
                    {selectedConcept.hasHardSpot && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full text-amber-600 bg-amber-50 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Has tricky parts
                      </span>
                    )}
                  </div>
                </div>

                {selectedConcept.prerequisites.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Prerequisites</h4>
                    <div className="space-y-1">
                      {selectedConcept.prerequisites.map((prereq) => {
                        const prereqConcept = concepts.find((c) => c.id === prereq);
                        return (
                          <div key={prereq} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-foreground">{prereqConcept?.shortTitle}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedConcept.status !== "locked" && (
                  <button
                    onClick={navigateToConcept}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                  >
                    {selectedConcept.status === "completed" ? "Review Concept" : "Start Learning"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Info className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Select a Concept</h3>
                <p className="text-sm text-muted-foreground">
                  Click on any concept node to see details and start learning.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ConceptMap;
