import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const ZoomControls = ({ zoom, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) => {
  const handleZoomIn = () => {
    onZoomIn();
  };

  const handleZoomOut = () => {
    onZoomOut();
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <nav
      className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-lg border border-border/50 p-1 shadow-sm"
      aria-label="Zoom controls"
    >
      <button
        type="button"
        onClick={handleZoomOut}
        className="p-2 hover:bg-muted rounded-md transition-colors"
        aria-label="Zoom out"
      >
        <ZoomOut className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
      </button>
      <span className="text-xs text-muted-foreground w-12 text-center" aria-live="polite">
        {Math.round(zoom * 100)}%
      </span>
      <button
        type="button"
        onClick={handleZoomIn}
        className="p-2 hover:bg-muted rounded-md transition-colors"
        aria-label="Zoom in"
      >
        <ZoomIn className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
      </button>
      <div className="w-px h-6 bg-border" aria-hidden="true" />
      <button
        type="button"
        onClick={handleReset}
        className="p-2 hover:bg-muted rounded-md transition-colors"
        aria-label="Reset view"
      >
        <RotateCcw className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
      </button>
    </nav>
  );
};

export default ZoomControls;
