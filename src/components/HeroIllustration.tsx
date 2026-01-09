import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Lightbulb, Target } from "lucide-react";

const HeroIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central illustration */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Subtle outer ring */}
        <motion.div
          className="absolute inset-0 w-72 h-72 -m-12 rounded-full border border-primary/10"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Main circle */}
        <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl">
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <GraduationCap className="w-20 h-20 text-white/90" />
          </motion.div>

          {/* Orbiting elements - more subtle */}
          <motion.div
            className="absolute w-full h-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-lg bg-white shadow-md flex items-center justify-center border border-border/50">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
          </motion.div>

          <motion.div
            className="absolute w-full h-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-lg bg-white shadow-md flex items-center justify-center border border-border/50">
              <Lightbulb className="w-4 h-4 text-amber-500" />
            </div>
          </motion.div>

          <motion.div
            className="absolute w-full h-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-9 h-9 rounded-lg bg-white shadow-md flex items-center justify-center border border-border/50">
              <Target className="w-4 h-4 text-primary" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Minimal floating dots */}
      <motion.div
        className="absolute top-16 left-20 w-2 h-2 rounded-full bg-primary/20"
        animate={{
          y: [0, -8, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-24 right-16 w-2 h-2 rounded-full bg-primary/25"
        animate={{
          y: [0, 8, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-32 right-24 w-1.5 h-1.5 rounded-full bg-primary/15"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default HeroIllustration;
