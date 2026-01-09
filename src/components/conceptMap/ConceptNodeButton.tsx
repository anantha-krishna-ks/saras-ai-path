import { motion } from "framer-motion";
import { Lock, CheckCircle2, AlertTriangle } from "lucide-react";
import type { ConceptNode } from "@/data/conceptMapData";

interface ConceptNodeButtonProps {
  concept: ConceptNode;
  position: { x: number; y: number };
  index: number;
  nodeWidth: number;
  nodeHeight: number;
  isHovered: boolean;
  isSelected: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

const getStatusStyles = (status: ConceptNode["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20";
    case "current":
      return "bg-primary border-primary text-white ring-4 ring-primary/20 shadow-lg shadow-primary/30";
    case "available":
      return "bg-background border-primary text-foreground hover:border-primary hover:shadow-lg";
    case "locked":
      return "bg-muted/80 border-border text-muted-foreground";
  }
};

const ConceptNodeButton = ({
  concept,
  position,
  index,
  nodeWidth,
  nodeHeight,
  isHovered,
  isSelected,
  onHoverStart,
  onHoverEnd,
  onClick,
}: ConceptNodeButtonProps) => {
  const handleClick = () => {
    if (concept.status !== "locked") {
      onClick();
    }
  };

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 + index * 0.08, type: "spring", stiffness: 200 }}
      onClick={handleClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      disabled={concept.status === "locked"}
      aria-label={`${concept.title} - ${concept.status}`}
      aria-disabled={concept.status === "locked"}
      className={`absolute flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${getStatusStyles(
        concept.status
      )} ${concept.status !== "locked" ? "cursor-pointer hover:scale-105" : "cursor-not-allowed"} ${
        isSelected ? "ring-4 ring-primary/40 scale-105" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: nodeWidth,
        height: nodeHeight,
        zIndex: isHovered || isSelected ? 10 : 1,
      }}
    >
      {concept.status === "completed" && <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />}
      {concept.status === "locked" && <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span className="font-medium text-sm truncate">{concept.shortTitle}</span>
      {concept.hasHardSpot && concept.status !== "completed" && concept.status !== "locked" && (
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" aria-label="Has tricky parts" />
      )}
    </motion.button>
  );
};

export default ConceptNodeButton;
