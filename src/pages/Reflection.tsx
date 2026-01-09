import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, MessageSquare, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const reflectionPrompts = [
  "What did you think about inertia before this lesson?",
  "What surprised you the most?",
  "How would you explain inertia to a friend?",
];

const Reflection = () => {
  const navigate = useNavigate();
  const { conceptId } = useParams();
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [responses, setResponses] = useState<string[]>(["", "", ""]);
  const [confidenceBefore] = useState(50); // This would come from the readiness step
  const [confidenceAfter, setConfidenceAfter] = useState(75);
  const [step, setStep] = useState<"reflection" | "confidence" | "summary">("reflection");

  const handleResponseChange = (value: string) => {
    const newResponses = [...responses];
    newResponses[currentPrompt] = value;
    setResponses(newResponses);
  };

  const handleNextPrompt = () => {
    if (currentPrompt < reflectionPrompts.length - 1) {
      setCurrentPrompt(currentPrompt + 1);
    } else {
      setStep("confidence");
    }
  };

  const handleConfidenceSubmit = () => {
    setStep("summary");
  };

  const handleComplete = () => {
    navigate("/concept-map/physics");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-center">
          <BrandLogo />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {step === "reflection" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {reflectionPrompts.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    index <= currentPrompt ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Time to Reflect</h2>
                  <p className="text-sm text-muted-foreground">
                    Question {currentPrompt + 1} of {reflectionPrompts.length}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-foreground">
                  {reflectionPrompts[currentPrompt]}
                </h3>

                <textarea
                  value={responses[currentPrompt]}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  placeholder="Take a moment to think and write your thoughts..."
                  className="w-full h-40 p-4 rounded-xl border border-border bg-muted/30 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />

                <p className="text-sm text-muted-foreground">
                  ✨ There's no right or wrong answer — this is just for you to process what you learned.
                </p>

                <div className="flex justify-between">
                  {currentPrompt > 0 && (
                    <button
                      onClick={() => setCurrentPrompt(currentPrompt - 1)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={handleNextPrompt}
                    className="ml-auto flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-200"
                  >
                    {currentPrompt === reflectionPrompts.length - 1 ? "Continue" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === "confidence" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">How confident do you feel now?</h2>
                  <p className="text-sm text-muted-foreground">About Newton's First Law</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={confidenceAfter}
                    onChange={(e) => setConfidenceAfter(parseInt(e.target.value))}
                    className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                    style={{
                      background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${confidenceAfter}%, hsl(var(--muted)) ${confidenceAfter}%, hsl(var(--muted)) 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Not confident</span>
                    <span className="font-semibold text-primary text-lg">{confidenceAfter}%</span>
                    <span className="text-muted-foreground">Very confident</span>
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div className="bg-gradient-to-r from-muted/50 to-green-50 rounded-xl p-6">
                  <h4 className="font-medium text-foreground mb-4">Your confidence journey</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 text-center">
                      <p className="text-3xl font-semibold text-muted-foreground">{confidenceBefore}%</p>
                      <p className="text-sm text-muted-foreground">Before</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-green-500" />
                    <div className="flex-1 text-center">
                      <p className="text-3xl font-semibold text-green-600">{confidenceAfter}%</p>
                      <p className="text-sm text-green-600">After</p>
                    </div>
                  </div>
                  {confidenceAfter > confidenceBefore && (
                    <p className="text-center text-sm text-green-600 mt-4">
                      🎉 Great progress! You've grown +{confidenceAfter - confidenceBefore}%
                    </p>
                  )}
                </div>

                <button
                  onClick={handleConfidenceSubmit}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-200"
                >
                  See Your Progress
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "summary" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </motion.div>

              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Concept Complete! 🎉
              </h2>
              <p className="text-muted-foreground mb-8">
                You've successfully learned Newton's First Law of Motion
              </p>

              {/* Mastery Indicator */}
              <div className="bg-gradient-to-br from-primary/5 to-green-50 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Understanding Level</span>
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-8 h-8 rounded-lg ${
                        level <= 4 ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Strong understanding — ready for the next concept!
                </p>
              </div>

              {/* What's Next */}
              <div className="bg-muted/50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-foreground mb-3">Up next</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">⚖️</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Newton's Second Law (F=ma)</p>
                    <p className="text-sm text-muted-foreground">~25 minutes</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-dark transition-all duration-200"
              >
                Continue to Concept Map
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Reflection;
