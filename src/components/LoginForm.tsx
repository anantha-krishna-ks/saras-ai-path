import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn } from "lucide-react";
import LoginInput from "./ui/LoginInput";
import LoginButton from "./ui/LoginButton";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { toast } = useToast();
  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Store username for personalization
    localStorage.setItem("username", username);

    toast({
      title: "Welcome back! 🎉",
      description: "You've successfully logged in to Saras School AI Learner.",
    });

    // Navigate to dashboard after successful login
    navigate("/dashboard");
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <LoginInput
          label="Username"
          type="text"
          icon={User}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
          autoComplete="username"
        />

        <LoginInput
          label="Password"
          type="password"
          icon={Lock}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsForgotPasswordOpen(true)}
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors hover:underline underline-offset-4"
          >
            Forgot password?
          </button>
        </div>

        <LoginButton type="submit" isLoading={isLoading}>
          <span className="flex items-center justify-center gap-2">
            <LogIn size={20} />
            Sign In
          </span>
        </LoginButton>
      </motion.form>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  );
};

export default LoginForm;
