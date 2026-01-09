import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const MapLegend = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 p-4 bg-card rounded-xl border border-border/50"
      aria-label="Concept status legend"
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="w-4 h-4 rounded-full bg-green-500" aria-hidden="true" />
        <span className="text-muted-foreground">Completed</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="w-4 h-4 rounded-full bg-primary ring-2 ring-primary/30" aria-hidden="true" />
        <span className="text-muted-foreground">Current</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="w-4 h-4 rounded-full border-2 border-primary bg-background" aria-hidden="true" />
        <span className="text-muted-foreground">Available</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="w-4 h-4 rounded-full bg-muted border border-border" aria-hidden="true" />
        <span className="text-muted-foreground">Locked</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <AlertTriangle className="w-4 h-4 text-amber-500" aria-hidden="true" />
        <span className="text-muted-foreground">Has tricky parts</span>
      </div>
    </motion.nav>
  );
};

export default MapLegend;
