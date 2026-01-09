import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const confidenceLevels = [
  { min: 0, max: 25, label: "Not confident at all", emoji: "😟" },
  { min: 26, max: 50, label: "Somewhat unsure", emoji: "🤔" },
  { min: 51, max: 75, label: "Fairly confident", emoji: "😊" },
  { min: 76, max: 100, label: "Very confident!", emoji: "🚀" },
];

const getConfidenceLevel = (value: number) => {
  return confidenceLevels.find((level) => value >= level.min && value <= level.max) || confidenceLevels[0];
};

const ConfidenceSlider = ({ value, onChange }: ConfidenceSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const currentLevel = getConfidenceLevel(value);

  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="space-y-5">
      {/* Emoji indicators row */}
      <div className="flex justify-between items-center px-1">
        {confidenceLevels.map((level) => {
          const isActive = value >= level.min && value <= level.max;
          return (
            <motion.button
              key={level.min}
              onClick={() => onChange(level.min + Math.floor((level.max - level.min) / 2))}
              className={`text-2xl transition-all duration-200 p-2 rounded-full ${
                isActive ? 'scale-125 bg-muted/50' : 'opacity-40 hover:opacity-70 hover:scale-110'
              }`}
              whileHover={{ scale: isActive ? 1.25 : 1.15 }}
              whileTap={{ scale: 0.95 }}
              aria-label={level.label}
            >
              {level.emoji}
            </motion.button>
          );
        })}
      </div>

      {/* Gradient Slider with value in thumb */}
      <div className="relative py-4">
        <SliderPrimitive.Root
          value={[value]}
          onValueChange={handleValueChange}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
          max={100}
          step={1}
          className="relative flex w-full touch-none select-none items-center cursor-pointer"
        >
          {/* Gradient track */}
          <SliderPrimitive.Track 
            className="relative h-3 w-full grow overflow-hidden rounded-full"
            style={{
              background: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #84cc16, #22c55e)'
            }}
          >
            <SliderPrimitive.Range className="absolute h-full bg-transparent" />
          </SliderPrimitive.Track>

          {/* Circular thumb with value */}
          <SliderPrimitive.Thumb asChild>
            <motion.div
              className="flex items-center justify-center h-12 w-12 -mt-0.5 rounded-full bg-background border-[3px] shadow-lg cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                borderColor: value <= 25 ? '#ef4444' : value <= 50 ? '#f97316' : value <= 75 ? '#84cc16' : '#22c55e'
              }}
              animate={{ 
                scale: isDragging ? 1.1 : 1,
                boxShadow: isDragging 
                  ? '0 0 20px rgba(0,0,0,0.15)' 
                  : '0 4px 12px rgba(0,0,0,0.1)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-sm font-bold text-foreground">{value}</span>
            </motion.div>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>

      {/* Dynamic feedback message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLevel.label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="mr-1">{currentLevel.emoji}</span>
            <span className="font-medium text-foreground">{currentLevel.label}</span>
            <span className="ml-1">— We'll tailor content to help you grow!</span>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ConfidenceSlider;
