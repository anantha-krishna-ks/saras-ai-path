import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ConceptNode } from "@/data/conceptMapData";
import { concepts } from "@/data/conceptMapData";

interface ConceptDetailsPanelProps {
  selectedConcept: ConceptNode | null;
  onNavigate: () => void;
}

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

const getStatusText = (status: ConceptNode["status"]) => {
  switch (status) {
    case "completed":
      return "You've mastered this concept!";
    case "current":
      return "Continue where you left off";
    case "available":
      return "Ready to start learning";
    case "locked":
      return "Complete prerequisites to unlock";
  }
};

const getButtonText = (status: ConceptNode["status"]) => {
  switch (status) {
    case "completed":
      return "Review Again";
    case "current":
      return "Continue Learning";
    case "available":
      return "Start Learning";
    default:
      return "Locked";
  }
};

const ConceptDetailsPanel = ({ selectedConcept, onNavigate }: ConceptDetailsPanelProps) => {
  const handleNavigateClick = () => {
    onNavigate();
  };

  if (!selectedConcept) {
    return (
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border/50 p-6 h-fit lg:sticky lg:top-24"
        aria-label="Concept details"
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Info className="w-10 h-10 text-muted-foreground/50 mb-3" aria-hidden="true" />
          <h3 className="font-medium text-foreground mb-1">Select a Concept</h3>
          <p className="text-sm text-muted-foreground">
            Click on any concept node to see details and start learning
          </p>
        </div>
      </motion.aside>
    );
  }

  const difficultyInfo = getDifficultyLabel(selectedConcept.difficulty);
  const prerequisiteNames = selectedConcept.prerequisites.map(
    (prereqId) => concepts.find((c) => c.id === prereqId)?.shortTitle || prereqId
  );

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl border border-border/50 p-6 h-fit lg:sticky lg:top-24"
      aria-label="Concept details"
    >
      <article className="space-y-6">
        <header>
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {selectedConcept.title}
            </h3>
            {selectedConcept.status === "completed" && (
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" aria-label="Completed" />
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyInfo.color}`}>
              {difficultyInfo.label}
            </span>
            {selectedConcept.hasHardSpot && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full text-amber-600 bg-amber-50 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                Has tricky parts
              </span>
            )}
          </div>
        </header>

        <section aria-label="Status">
          <p className="text-sm text-muted-foreground">
            {getStatusText(selectedConcept.status)}
          </p>
        </section>

        {prerequisiteNames.length > 0 && (
          <section aria-label="Prerequisites">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Prerequisites
            </h4>
            <ul className="space-y-1">
              {prerequisiteNames.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </section>
        )}

        <Button
          onClick={handleNavigateClick}
          disabled={selectedConcept.status === "locked"}
          className="w-full gap-2"
          size="lg"
          aria-label={`${getButtonText(selectedConcept.status)} ${selectedConcept.title}`}
        >
          {getButtonText(selectedConcept.status)}
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      </article>
    </motion.aside>
  );
};

export default ConceptDetailsPanel;
