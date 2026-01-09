import { motion } from "framer-motion";

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orb - top right */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary/30 to-accent-purple/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Coral accent orb - bottom left */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-accent-coral/25 to-accent/10 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Cyan accent - center right */}
      <motion.div
        className="absolute top-1/2 -right-16 w-64 h-64 rounded-full bg-gradient-to-l from-accent-cyan/20 to-primary/10 blur-2xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-24 left-[15%] w-4 h-4 rounded-full bg-primary/60"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[40%] left-[8%] w-3 h-3 rounded-sm bg-accent-coral/70 rotate-45"
        animate={{
          y: [0, 15, 0],
          rotate: [45, 225, 405],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute bottom-[30%] left-[20%] w-5 h-5 rounded-full border-2 border-primary/40"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-[20%] right-[25%] w-6 h-6 rounded-lg bg-accent-purple/30 rotate-12"
        animate={{
          y: [0, 20, 0],
          rotate: [12, -12, 12],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[20%] right-[15%] w-4 h-4 rounded-full bg-accent-cyan/50"
        animate={{
          y: [0, -18, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Stars/sparkles */}
      <motion.div
        className="absolute top-[15%] left-[40%] w-2 h-2 bg-primary/80 rounded-full"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[40%] right-[30%] w-1.5 h-1.5 bg-accent-coral/90 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
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

export default FloatingShapes;
