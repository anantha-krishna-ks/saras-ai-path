import { useState } from "react";
import { motion } from "framer-motion";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const confidenceLevels = [
  { min: 0, max: 25, label: "Not confident", emoji: "😟" },
  { min: 26, max: 50, label: "Somewhat confident", emoji: "🤔" },
  { min: 51, max: 75, label: "Fairly confident", emoji: "😊" },
  { min: 76, max: 100, label: "Very confident", emoji: "🚀" },
];

const getConfidenceLevel = (value: number) => {
  return confidenceLevels.find((level) => value >= level.min && value <= level.max) || confidenceLevels[1];
};

const ConfidenceSlider = ({ value, onChange }: ConfidenceSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const currentLevel = getConfidenceLevel(value);

  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="space-y-4">
      {/* Simple Label with Emoji */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Drag to set your confidence</span>
        <motion.div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border"
          animate={{ scale: isDragging ? 1.02 : 1 }}
        >
          <span className="text-lg">{currentLevel.emoji}</span>
          <span className="text-sm font-medium text-foreground">{currentLevel.label}</span>
        </motion.div>
      </div>

      {/* Clean Slider */}
      <div className="py-2">
        <SliderPrimitive.Root
          value={[value]}
          onValueChange={handleValueChange}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
          max={100}
          step={1}
          className="relative flex w-full touch-none select-none items-center cursor-pointer group"
        >
          <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-muted border border-border">
            <SliderPrimitive.Range className="absolute h-full bg-primary/80 transition-colors" />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb asChild>
            <motion.div
              className="block h-6 w-6 rounded-full bg-background border-2 border-primary shadow-md cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.15 }}
            />
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>

      {/* Minimal Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Not at all</span>
        <span>Very confident</span>
      </div>
    </div>
  );
};

export default ConfidenceSlider;
