import { motion } from "framer-motion";
import logoImage from "@/assets/saras-school-logo.png";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

const BrandLogo = ({ size = "md", showTagline = false }: BrandLogoProps) => {
  const sizes = {
    sm: { height: "h-8" },
    md: { height: "h-10" },
    lg: { height: "h-14" },
  };

  return (
    <motion.div
      className="flex flex-col items-start"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={logoImage}
        alt="Saras School AI"
        className={`${sizes[size].height} w-auto object-contain`}
      />
      {showTagline && (
        <motion.p
          className="mt-3 text-muted-foreground text-sm font-medium"
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
