import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

const LoginButton = forwardRef<HTMLButtonElement, LoginButtonProps>(
  ({ children, isLoading, variant = "primary", className, disabled, ...props }, ref) => {
    const baseStyles = cn(
      "relative w-full h-14 rounded-xl font-semibold text-lg",
      "transition-all duration-300 ease-out",
      "focus:outline-none focus:ring-4 focus:ring-primary/20",
      "disabled:opacity-60 disabled:cursor-not-allowed"
    );

    const variants = {
      primary: cn(
        "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground",
        "shadow-lg hover:shadow-glow hover:-translate-y-0.5",
        "active:translate-y-0"
      ),
      secondary: cn(
        "bg-white border-2 border-border text-foreground",
        "hover:border-primary hover:bg-primary/5"
      ),
      ghost: cn(
        "bg-transparent text-primary",
        "hover:bg-primary/10"
      ),
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={disabled || isLoading}
        whileTap={{ scale: 0.98 }}
        type={props.type}
        onClick={props.onClick}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Please wait...</span>
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

LoginButton.displayName = "LoginButton";

export default LoginButton;
