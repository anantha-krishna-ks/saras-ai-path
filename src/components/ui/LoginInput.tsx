import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ label, icon: Icon, error, type, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label className="block text-sm font-medium text-foreground/80 mb-2">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
                isFocused ? "text-primary" : "text-foreground/60"
              )}
            >
              <Icon size={20} strokeWidth={2} />
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full h-14 rounded-xl border-2 bg-white/80 backdrop-blur-sm",
              "text-foreground placeholder:text-muted-foreground/60",
              "transition-all duration-200 ease-out",
              "focus:outline-none focus:border-primary focus:shadow-input-focus",
              Icon ? "pl-12 pr-4" : "px-4",
              isPassword && "pr-12",
              error
                ? "border-destructive focus:border-destructive"
                : "border-border hover:border-primary/50",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg",
                "text-muted-foreground hover:text-foreground transition-colors",
                "focus:outline-none focus:text-primary"
              )}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

LoginInput.displayName = "LoginInput";

export default LoginInput;
