import { motion } from "framer-motion";

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orb - top right - more subtle */}
      <motion.div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/15 to-primary/5 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary orb - bottom left */}
      <motion.div
        className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Subtle center glow */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-2xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default FloatingShapes;
