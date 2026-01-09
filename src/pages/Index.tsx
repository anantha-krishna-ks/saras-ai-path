import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import LoginForm from "@/components/LoginForm";
import FloatingShapes from "@/components/ui/FloatingShapes";
import HeroIllustration from "@/components/HeroIllustration";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingShapes />

      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Branding & Illustration (hidden on mobile) */}
        <motion.div
          className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-primary/5 via-background to-accent-purple/5 flex-col justify-between p-8 xl:p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BrandLogo size="lg" />

          <div className="flex-1 flex items-center justify-center">
            <HeroIllustration />
          </div>

          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl xl:text-4xl font-semibold text-foreground leading-tight">
              Learn smarter, not harder with{" "}
              <span className="text-gradient">AI-powered</span> education
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your personalized learning companion that adapts to your pace, style, and goals.
            </p>

          </motion.div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <BrandLogo size="md" showTagline />
          </div>

          <div className="w-full max-w-md mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground mb-8">
                Sign in to continue your learning journey
              </p>
            </motion.div>

            <LoginForm />

            {/* Footer */}
            <motion.div
              className="mt-8 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>
                By signing in, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
