import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import ConceptNodeButton from "@/components/conceptMap/ConceptNodeButton";
import ConceptDetailsPanel from "@/components/conceptMap/ConceptDetailsPanel";
import MapLegend from "@/components/conceptMap/MapLegend";
import ZoomControls from "@/components/conceptMap/ZoomControls";
import { concepts, connections, MAP_CONSTANTS, type ConceptNode } from "@/data/conceptMapData";

const { NODE_WIDTH, NODE_HEIGHT, ROW_GAP, COL_WIDTH, PADDING } = MAP_CONSTANTS;

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
    const x = PADDING + node.col * COL_WIDTH + (node.col === 1 ? 0 : node.col === 0 ? 20 : -20);
    const y = PADDING + node.row * ROW_GAP;
    return { x, y };
  };

  // Get connection path between two nodes
  const getConnectionPath = (fromId: string, toId: string) => {
    const fromNode = concepts.find((c) => c.id === fromId);
    const toNode = concepts.find((c) => c.id === toId);
    if (!fromNode || !toNode) return "";

    const fromPos = getNodePosition(fromNode);
    const toPos = getNodePosition(toNode);

    const startX = fromPos.x + NODE_WIDTH / 2;
    const startY = fromPos.y + NODE_HEIGHT;
    const endX = toPos.x + NODE_WIDTH / 2;
    const endY = toPos.y;

    const midY = (startY + endY) / 2;
    return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
  };

  const getConnectionStatus = (fromId: string, toId: string) => {
    const toNode = concepts.find((c) => c.id === toId);
    if (!toNode) return "locked";
    return toNode.status;
  };

  const getConnectionColor = (status: string) => {
    switch (status) {
      case "completed":
        return "hsl(var(--chart-2))";
      case "current":
      case "available":
        return "hsl(var(--primary))";
      default:
        return "hsl(var(--border))";
    }
  };

  const handleConceptClick = (concept: ConceptNode) => {
    setSelectedConcept(concept);
  };

  const handleNavigateToConcept = () => {
    if (selectedConcept && selectedConcept.status !== "locked") {
      navigate(`/concept/${selectedConcept.id}`);
    }
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 1.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === containerRef.current || (e.target as HTMLElement).tagName === "svg") {
        setIsDragging(true);
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      }
    },
    [pan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    },
    [pan]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isDragging) {
        const touch = e.touches[0];
        setPan({
          x: touch.clientX - dragStart.x,
          y: touch.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const mapWidth = COL_WIDTH * 3 + PADDING * 2;
  const mapHeight = ROW_GAP * 5 + PADDING * 2;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBackClick}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-medium hidden sm:inline">Dashboard</span>
          </button>
          <BrandLogo />
          <div className="w-20" aria-hidden="true" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Title Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
            Newton's Laws of Motion
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Follow the learning path below. Complete concepts to unlock new ones.
          </p>
        </motion.header>

        {/* Legend */}
        <MapLegend />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Concept Map */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-card rounded-2xl border border-border/50 overflow-hidden relative"
            aria-label="Interactive concept map"
          >
            {/* Zoom Controls */}
            <ZoomControls
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleResetView}
            />

            {/* Map Container */}
            <div
              ref={containerRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing touch-none"
              style={{ height: "450px", minHeight: "350px" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              role="application"
              aria-label="Concept map canvas - drag to pan"
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
                  aria-hidden="true"
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
                {concepts.map((concept, index) => (
                  <ConceptNodeButton
                    key={concept.id}
                    concept={concept}
                    position={getNodePosition(concept)}
                    index={index}
                    nodeWidth={NODE_WIDTH}
                    nodeHeight={NODE_HEIGHT}
                    isHovered={hoveredConcept === concept.id}
                    isSelected={selectedConcept?.id === concept.id}
                    onHoverStart={() => setHoveredConcept(concept.id)}
                    onHoverEnd={() => setHoveredConcept(null)}
                    onClick={() => handleConceptClick(concept)}
                  />
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50">
              💡 Drag to pan • Use controls to zoom
            </div>
          </motion.section>

          {/* Concept Details Panel */}
          <ConceptDetailsPanel
            selectedConcept={selectedConcept}
            onNavigate={handleNavigateToConcept}
          />
        </div>
      </main>
    </div>
  );
};

export default ConceptMap;
