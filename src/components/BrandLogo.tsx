import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

const BrandLogo = ({ size = "md", showTagline = false }: BrandLogoProps) => {
  const sizes = {
    sm: { icon: 24, text: "text-xl", gap: "gap-2" },
    md: { icon: 32, text: "text-2xl", gap: "gap-3" },
    lg: { icon: 48, text: "text-4xl", gap: "gap-4" },
  };

  return (
    <motion.div
      className="flex flex-col items-start"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex items-center ${sizes[size].gap}`}>
        <motion.div
          className="relative"
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-glow">
            <Sparkles className="w-6 h-6 text-white" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-coral"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
        <div className="flex flex-col">
          <h1 className={`${sizes[size].text} font-bold tracking-tight`}>
            <span className="text-primary">Saras</span>
            <span className="text-foreground"> School</span>
          </h1>
          <span className="text-sm font-medium text-primary/80 -mt-0.5">
            AI Learner
          </span>
        </div>
      </div>
      {showTagline && (
        <motion.p
          className="mt-3 text-muted-foreground text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your personalized learning journey starts here
        </motion.p>
      )}
    </motion.div>
  );
};

export default BrandLogo;
