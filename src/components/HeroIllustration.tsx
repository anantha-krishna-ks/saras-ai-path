import { motion } from "framer-motion";
import { BookOpen, Brain, Lightbulb, Rocket, Star, Target, Zap } from "lucide-react";

const HeroIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central brain/book illustration */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 w-64 h-64 -m-8 rounded-full bg-gradient-to-r from-primary/20 via-accent-purple/20 to-accent-cyan/20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Main circle */}
        <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-2xl">
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Brain className="w-24 h-24 text-white/90" />
          </motion.div>

          {/* Orbiting elements */}
          <motion.div
            className="absolute w-full h-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
          </motion.div>

          <motion.div
            className="absolute w-full h-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-accent-coral" />
            </div>
          </motion.div>

          <motion.div
            className="absolute w-full h-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-accent-purple" />
            </div>
          </motion.div>

          <motion.div
            className="absolute w-full h-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-accent-cyan" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-12 left-16 w-8 h-8 rounded-lg bg-accent-coral/20 flex items-center justify-center"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Zap className="w-4 h-4 text-accent-coral" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-12 w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Star className="w-4 h-4 text-accent-purple" />
      </motion.div>

      <motion.div
        className="absolute top-32 right-20 w-6 h-6 rounded-full bg-primary/30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 left-20 w-4 h-4 rounded-full bg-accent-cyan/40"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
};

export default HeroIllustration;
