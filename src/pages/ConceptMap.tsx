import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Lock, CheckCircle2, AlertTriangle, ChevronRight, Info, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

interface ConceptNode {
  id: string;
  title: string;
  shortTitle: string;
  status: "completed" | "current" | "locked" | "available";
  difficulty: "easy" | "medium" | "hard";
  hasHardSpot: boolean;
  prerequisites: string[];
  row: number;
  col: number;
}

// Define concepts with row/col for clean grid layout
const concepts: ConceptNode[] = [
  {
    id: "motion-basics",
    title: "What is Motion?",
    shortTitle: "Motion Basics",
    status: "completed",
    difficulty: "easy",
    hasHardSpot: false,
    prerequisites: [],
    row: 0,
    col: 1, // Center
  },
  {
    id: "speed-velocity",
    title: "Speed and Velocity",
    shortTitle: "Speed & Velocity",
    status: "completed",
    difficulty: "easy",
    hasHardSpot: false,
    prerequisites: ["motion-basics"],
    row: 1,
    col: 0, // Left
  },
  {
    id: "acceleration",
    title: "Understanding Acceleration",
    shortTitle: "Acceleration",
    status: "completed",
    difficulty: "medium",
    hasHardSpot: false,
    prerequisites: ["motion-basics"],
    row: 1,
    col: 2, // Right
  },
  {
    id: "first-law",
    title: "Newton's First Law (Inertia)",
    shortTitle: "First Law",
    status: "current",
    difficulty: "medium",
    hasHardSpot: true,
    prerequisites: ["speed-velocity", "acceleration"],
    row: 2,
    col: 1, // Center
  },
  {
    id: "second-law",
    title: "Newton's Second Law (F=ma)",
    shortTitle: "Second Law",
    status: "available",
    difficulty: "hard",
    hasHardSpot: true,
    prerequisites: ["first-law"],
    row: 3,
    col: 0, // Left
  },
  {
    id: "third-law",
    title: "Newton's Third Law (Action-Reaction)",
    shortTitle: "Third Law",
    status: "locked",
    difficulty: "medium",
    hasHardSpot: false,
    prerequisites: ["first-law"],
    row: 3,
    col: 2, // Right
  },
  {
    id: "friction",
    title: "Friction and Its Types",
    shortTitle: "Friction",
    status: "locked",
    difficulty: "medium",
    hasHardSpot: true,
    prerequisites: ["second-law", "third-law"],
    row: 4,
    col: 1, // Center
  },
];

// Connection definitions
const connections: { from: string; to: string }[] = [
  { from: "motion-basics", to: "speed-velocity" },
  { from: "motion-basics", to: "acceleration" },
  { from: "speed-velocity", to: "first-law" },
  { from: "acceleration", to: "first-law" },
  { from: "first-law", to: "second-law" },
  { from: "first-law", to: "third-law" },
  { from: "second-law", to: "friction" },
  { from: "third-law", to: "friction" },
];

const NODE_WIDTH = 160;
const NODE_HEIGHT = 56;
const ROW_GAP = 100;
const COL_WIDTH = 200;
const PADDING = 80;

const ConceptMap = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate node positions
  const getNodePosition = (node: ConceptNode) => {
    const x = PADDING + node.col * COL_WIDTH + (node.col === 1 ? 0 : (node.col === 0 ? 20 : -20));
    const y = PADDING + node.row * ROW_GAP;
    return { x, y };
  };

  // Get connection path between two nodes
  const getConnectionPath = (fromId: string, toId: string) => {
    const fromNode = concepts.find(c => c.id === fromId);
    const toNode = concepts.find(c => c.id === toId);
    if (!fromNode || !toNode) return "";

    const fromPos = getNodePosition(fromNode);
    const toPos = getNodePosition(toNode);

    const startX = fromPos.x + NODE_WIDTH / 2;
    const startY = fromPos.y + NODE_HEIGHT;
    const endX = toPos.x + NODE_WIDTH / 2;
    const endY = toPos.y;

    // Create smooth bezier curve
    const midY = (startY + endY) / 2;
    return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
  };

  const getConnectionStatus = (fromId: string, toId: string) => {
    const toNode = concepts.find(c => c.id === toId);
    if (!toNode) return "locked";
    return toNode.status;
  };

  const getStatusStyles = (status: ConceptNode["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/20";
      case "current":
        return "bg-primary border-primary text-white ring-4 ring-primary/20 shadow-lg shadow-primary/30";
      case "available":
        return "bg-white border-primary text-foreground hover:border-primary hover:shadow-lg";
      case "locked":
        return "bg-muted/80 border-border text-muted-foreground";
    }
  };

  const getConnectionColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#22c55e";
      case "current":
        return "hsl(217, 89%, 53%)";
      case "available":
        return "hsl(217, 89%, 53%)";
      default:
        return "#d1d5db";
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

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.6));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const mapWidth = COL_WIDTH * 3 + PADDING * 2;
  const mapHeight = ROW_GAP * 5 + PADDING * 2;

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
          className="mb-6"
        >
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Newton's Laws of Motion
          </h1>
          <p className="text-muted-foreground">
            Follow the learning path below. Complete concepts to unlock new ones.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-6 mb-6 p-4 bg-white rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-primary ring-2 ring-primary/30" />
            <span className="text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full border-2 border-primary bg-white" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-muted border border-border" />
            <span className="text-muted-foreground">Locked</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-muted-foreground">Has tricky parts</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Concept Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-border/50 overflow-hidden relative"
          >
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg border border-border/50 p-1 shadow-sm">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-muted rounded-md transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-muted-foreground" />
              </button>
              <span className="text-xs text-muted-foreground w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-muted rounded-md transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="w-px h-6 bg-border" />
              <button
                onClick={handleReset}
                className="p-2 hover:bg-muted rounded-md transition-colors"
                title="Reset view"
              >
                <RotateCcw className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Map Container */}
            <div
              ref={containerRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ height: "520px" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                  width: mapWidth,
                  height: mapHeight,
                  margin: "0 auto",
                }}
              >
                {/* SVG Connections */}
                <svg
                  width={mapWidth}
                  height={mapHeight}
                  className="absolute top-0 left-0 pointer-events-none"
                >
                  <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {connections.map((conn, index) => {
                    const status = getConnectionStatus(conn.from, conn.to);
                    const color = getConnectionColor(status);
                    const isActive = status === "completed" || status === "current" || status === "available";
                    
                    return (
                      <motion.path
                        key={`${conn.from}-${conn.to}`}
                        d={getConnectionPath(conn.from, conn.to)}
                        stroke={color}
                        strokeWidth={isActive ? 3 : 2}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={status === "locked" ? "8 4" : "none"}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        filter={isActive ? "url(#glow)" : "none"}
                      />
                    );
                  })}
                </svg>

                {/* Concept Nodes */}
                {concepts.map((concept, index) => {
                  const pos = getNodePosition(concept);
                  return (
                    <motion.button
                      key={concept.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.08, type: "spring", stiffness: 200 }}
                      onClick={() => handleConceptClick(concept)}
                      onMouseEnter={() => setHoveredConcept(concept.id)}
                      onMouseLeave={() => setHoveredConcept(null)}
                      disabled={concept.status === "locked"}
                      className={`absolute flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${getStatusStyles(
                        concept.status
                      )} ${concept.status !== "locked" ? "cursor-pointer hover:scale-105" : "cursor-not-allowed"} ${
                        selectedConcept?.id === concept.id ? "ring-4 ring-primary/40 scale-105" : ""
                      }`}
                      style={{
                        left: pos.x,
                        top: pos.y,
                        width: NODE_WIDTH,
                        height: NODE_HEIGHT,
                        zIndex: hoveredConcept === concept.id || selectedConcept?.id === concept.id ? 10 : 1,
                      }}
                    >
                      {concept.status === "completed" && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      {concept.status === "locked" && <Lock className="w-4 h-4 shrink-0" />}
                      <span className="font-medium text-sm truncate">{concept.shortTitle}</span>
                      {concept.hasHardSpot && concept.status !== "completed" && concept.status !== "locked" && (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50">
              💡 Drag to pan • Use controls to zoom
            </div>
          </motion.div>

          {/* Concept Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-border/50 p-6 h-fit lg:sticky lg:top-24"
          >
            {selectedConcept ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground leading-tight">
                      {selectedConcept.title}
                    </h3>
                    {selectedConcept.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyLabel(selectedConcept.difficulty).color}`}>
                      {getDifficultyLabel(selectedConcept.difficulty).label}
                    </span>
                    {selectedConcept.hasHardSpot && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full text-amber-600 bg-amber-50 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Tricky parts
                      </span>
                    )}
                  </div>
                </div>

                {selectedConcept.prerequisites.length > 0 && (
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Prerequisites</h4>
                    <div className="space-y-2">
                      {selectedConcept.prerequisites.map((prereq) => {
                        const prereqConcept = concepts.find((c) => c.id === prereq);
                        return (
                          <div key={prereq} className="flex items-center gap-2 text-sm bg-green-50 px-3 py-2 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-green-700">{prereqConcept?.shortTitle}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedConcept.status !== "locked" && (
                  <button
                    onClick={navigateToConcept}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20"
                  >
                    {selectedConcept.status === "completed" ? "Review Concept" : "Start Learning"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                  <Info className="w-8 h-8 text-primary/40" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Select a Concept</h3>
                <p className="text-sm text-muted-foreground">
                  Click on any concept in the map to see details and start learning.
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
