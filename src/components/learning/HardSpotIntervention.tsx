import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Lightbulb, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";
import ConfidenceSlider from "./ConfidenceSlider";

interface HardSpotInterventionProps {
  onComplete: (needsIntervention: boolean) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  misconceptionExplanation: string;
  correctExplanation: string;
}

const hardSpotQuestion: Question = {
  id: 1,
  question: "A ball is rolling on a smooth floor. If no force acts on it, what will happen?",
  options: [
    "It will slow down and stop",
    "It will keep rolling at the same speed forever",
    "It will speed up",
    "It will change direction",
  ],
  correctAnswer: 1,
  misconceptionExplanation: "Many people think objects naturally slow down. But actually, objects only slow down because of friction — an external force! Without any force, the ball would keep moving forever.",
  correctExplanation: "Exactly right! Without any external force (like friction), an object in motion stays in motion at the same speed. This is Newton's First Law!",
};

const HardSpotIntervention = ({ onComplete }: HardSpotInterventionProps) => {
  const [step, setStep] = useState<"question" | "feedback" | "mitigation">("question");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [confidence, setConfidence] = useState(50);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === hardSpotQuestion.correctAnswer;
    setIsCorrect(correct);
    setStep("feedback");
  };

  const handleContinue = () => {
    if (isCorrect || step === "mitigation") {
      onComplete(false);
    } else {
      setStep("mitigation");
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setStep("question");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <AnimatePresence mode="wait">
          {step === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl border border-border/50 shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Quick Check</h2>
                  <p className="text-sm text-muted-foreground">Let's see how well you understood this</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-foreground">
                  {hardSpotQuestion.question}
                </h3>

                <div className="space-y-3">
                  {hardSpotQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            selectedAnswer === index
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/30"
                          }`}
                        >
                          {selectedAnswer === index && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-foreground">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/50">
                  <ConfidenceSlider value={confidence} onChange={setConfidence} />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedAnswer !== null
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Check My Answer
                </button>
              </div>
            </motion.div>
          )}

          {step === "feedback" && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl border border-border/50 shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isCorrect ? "bg-green-500/10" : "bg-amber-500/10"
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Lightbulb className="w-6 h-6 text-amber-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {isCorrect ? "Excellent! 🎉" : "Let's think about this..."}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isCorrect ? "You got it right!" : "This is a common misconception"}
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-xl mb-6 ${
                isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"
              }`}>
                <p className={`leading-relaxed ${isCorrect ? "text-green-800" : "text-amber-800"}`}>
                  {isCorrect ? hardSpotQuestion.correctExplanation : hardSpotQuestion.misconceptionExplanation}
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-200"
              >
                {isCorrect ? "Continue" : "Learn More"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === "mitigation" && (
            <motion.div
              key="mitigation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl border border-border/50 shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Here's a helpful way to think about it
                  </h2>
                  <p className="text-sm text-muted-foreground">A quick analogy to help it click</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 border border-primary/10">
                  <h3 className="font-semibold text-foreground mb-3">🚀 The Space Analogy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Think of a spacecraft in outer space, far from any planets. Once the engines turn off, 
                    the spacecraft keeps moving at the same speed in the same direction — forever! 
                    There's no air to slow it down, no friction, no external force.
                  </p>
                </div>

                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-3">🌍 Back on Earth</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    On Earth, we're so used to friction that we think "slowing down" is natural. 
                    But it's actually friction (an external force) doing the work! 
                    Remove friction, and objects keep moving.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleRetry}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-all duration-200"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                  <button
                    onClick={handleContinue}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-200"
                  >
                    I Understand Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default HardSpotIntervention;
