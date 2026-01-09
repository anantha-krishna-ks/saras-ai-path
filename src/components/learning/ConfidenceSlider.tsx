import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const confidenceLevels = [
  { min: 0, max: 20, emoji: "😟", label: "Not confident", color: "from-red-400 to-orange-400" },
  { min: 21, max: 40, emoji: "😕", label: "A little unsure", color: "from-orange-400 to-amber-400" },
  { min: 41, max: 60, emoji: "🤔", label: "Somewhat confident", color: "from-amber-400 to-yellow-400" },
  { min: 61, max: 80, emoji: "😊", label: "Fairly confident", color: "from-yellow-400 to-green-400" },
  { min: 81, max: 100, emoji: "🚀", label: "Very confident", color: "from-green-400 to-emerald-500" },
];

const getConfidenceLevel = (value: number) => {
  return confidenceLevels.find((level) => value >= level.min && value <= level.max) || confidenceLevels[2];
};

const ConfidenceSlider = ({ value, onChange }: ConfidenceSliderProps) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const currentLevel = getConfidenceLevel(value);

  useEffect(() => {
    if (isInteracting) {
      setShowTooltip(true);
    } else {
      const timer = setTimeout(() => setShowTooltip(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInteracting, value]);

  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="space-y-6">
      {/* Emoji Display */}
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel.emoji}
            initial={{ scale: 0.5, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="text-6xl mb-2"
          >
            {currentLevel.emoji}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentLevel.label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-lg font-medium text-foreground"
          >
            {currentLevel.label}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Slider Container */}
      <div className="relative px-2">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none"
              style={{ left: `${value}%`, transform: "translateX(-50%)" }}
            >
              <div className="bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                {value}%
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Slider */}
        <SliderPrimitive.Root
          value={[value]}
          onValueChange={handleValueChange}
          onPointerDown={() => setIsInteracting(true)}
          onPointerUp={() => setIsInteracting(false)}
          onPointerLeave={() => setIsInteracting(false)}
          max={100}
          step={1}
          className="relative flex w-full touch-none select-none items-center py-4 cursor-pointer"
        >
          {/* Track Background with markers */}
          <SliderPrimitive.Track className="relative h-4 w-full grow overflow-hidden rounded-full bg-muted shadow-inner">
            {/* Gradient Range */}
            <SliderPrimitive.Range 
              className={`absolute h-full bg-gradient-to-r ${currentLevel.color} transition-all duration-300`}
            />
            
            {/* Tick marks */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              {[0, 25, 50, 75, 100].map((tick) => (
                <div
                  key={tick}
                  className={`w-0.5 h-2 rounded-full transition-colors duration-300 ${
                    value >= tick ? "bg-white/40" : "bg-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
          </SliderPrimitive.Track>

          {/* Animated Thumb */}
          <SliderPrimitive.Thumb asChild>
            <motion.div
              className="block h-7 w-7 rounded-full bg-white border-4 border-primary shadow-lg cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.2 }}
              animate={{
                boxShadow: isInteracting
                  ? "0 0 20px 4px hsl(var(--primary) / 0.4)"
                  : "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary to-primary/80" />
            </motion.div>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>

        {/* Emoji Markers */}
        <div className="flex justify-between mt-2 px-1">
          {confidenceLevels.map((level, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => onChange(level.min + (level.max - level.min) / 2)}
              className={`text-xl transition-all duration-300 hover:scale-125 ${
                value >= level.min && value <= level.max
                  ? "opacity-100 scale-110"
                  : "opacity-40 grayscale"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
            >
              {level.emoji}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Percentage Display */}
      <div className="flex justify-center">
        <motion.div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r ${currentLevel.color} text-white font-bold text-2xl shadow-lg`}
          animate={{ scale: isInteracting ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span>{value}%</span>
        </motion.div>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        {[0, 25, 50, 75, 100].map((preset) => (
          <motion.button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              value === preset
                ? "bg-primary text-white shadow-md"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {preset}%
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ConfidenceSlider;
