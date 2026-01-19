import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, Brain } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import ConfidenceSlider from "@/components/learning/ConfidenceSlider";
interface Question {
  id: number;
  question: string;
  options: string[];
}

const priorKnowledgeQuestions: Question[] = [
  {
    id: 1,
    question: "What happens to a ball when you stop pushing it on a smooth surface?",
    options: [
      "It stops immediately",
      "It keeps moving for a while",
      "It moves faster",
      "I'm not sure",
    ],
  },
  {
    id: 2,
    question: "Why do you lean backward when a bus suddenly starts?",
    options: [
      "Because of gravity",
      "Because your body resists the change in motion",
      "Because the bus pushes you",
      "I'm not sure",
    ],
  },
  {
    id: 3,
    question: "What keeps the Moon moving around the Earth?",
    options: [
      "The Moon's own engine",
      "Earth's gravitational pull",
      "The Sun's light",
      "I'm not sure",
    ],
  },
];

const LearningReadiness = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [step, setStep] = useState<"confidence" | "why" | "questions">("confidence");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [confidence, setConfidence] = useState(50);

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleNext = () => {
    if (step === "confidence") {
      setStep("why");
    } else if (step === "why") {
      setStep("questions");
    } else if (step === "questions") {
      if (currentQuestion < priorKnowledgeQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate(`/concept-map/${subjectId}`);
      }
    }
  };

  const handleBack = () => {
    if (step === "confidence") {
      navigate("/dashboard");
    } else if (step === "why") {
      setStep("confidence");
    } else if (step === "questions") {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      } else {
        setStep("why");
      }
    }
  };

  const canProceed = () => {
    if (step === "confidence") return true;
    if (step === "why") return true;
    if (step === "questions") return answers[priorKnowledgeQuestions[currentQuestion].id] !== undefined;
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <BrandLogo />
          <div className="w-20" />
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2">
          <div className={`h-1.5 flex-1 rounded-full ${step === "confidence" || step === "why" || step === "questions" ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step === "why" || step === "questions" ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step === "questions" ? "bg-primary" : "bg-muted"}`} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Confidence</span>
          <span>Why learn this?</span>
          <span>Quick check</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {step === "confidence" && (
            <motion.div
              key="confidence"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-8">
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">
                      How confident do you feel?
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      About Newton's Laws of Motion
                    </p>
                  </div>
                </motion.div>

                <motion.p 
                  className="text-sm text-muted-foreground mb-8 bg-muted/50 px-4 py-2 rounded-lg inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  ✨ Be honest — this helps us adjust the learning path just for you!
                </motion.p>

                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <ConfidenceSlider 
                    value={confidence} 
                    onChange={setConfidence} 
                  />

                  <motion.div 
                    className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 border border-primary/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <p className="text-muted-foreground">
                      {confidence < 30 && "That's perfectly okay! We'll start from the basics and build up your understanding step by step. 🌱"}
                      {confidence >= 30 && confidence < 70 && "Great! You have some foundation to build on. Let's strengthen what you know and fill in any gaps. 💪"}
                      {confidence >= 70 && "Awesome! Let's see how deep your understanding goes. Ready for some interesting challenges? 🚀"}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === "why" && (
            <motion.div
              key="why"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-8">
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">
                      Why are we learning this?
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Newton's Laws of Motion
                    </p>
                  </div>
                </motion.div>

                <div className="space-y-6">
                  <motion.div 
                    className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 border border-primary/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                  >
                    <h3 className="font-semibold text-foreground mb-3">
                      🎯 The Big Question
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Have you ever wondered why you jerk forward when a car suddenly brakes? 
                      Or why a cricket ball keeps moving even after the bowler releases it?
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-muted/50 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                  >
                    <h3 className="font-semibold text-foreground mb-3">
                      🌍 Real World Connection
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Newton's laws explain how everything moves — from the planets in our solar system 
                      to the football you kick. Understanding these laws helps us design cars, rockets, 
                      and even roller coasters!
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-green-500/5 rounded-xl p-6 border border-green-500/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                  >
                    <h3 className="font-semibold text-foreground mb-3">
                      ✨ What you'll be able to do
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {[
                        "Predict how objects will move in different situations",
                        "Explain everyday phenomena like friction and momentum",
                        "Solve problems involving force, mass, and acceleration"
                      ].map((item, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + index * 0.1, duration: 0.3 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {step === "questions" && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm p-8">
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">
                      Quick Knowledge Check
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1} of {priorKnowledgeQuestions.length}
                    </p>
                  </div>
                </motion.div>

                <motion.p 
                  className="text-sm text-muted-foreground mb-6 bg-muted/50 px-4 py-2 rounded-lg inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  💡 No worries if you're not sure — this helps us personalize your learning!
                </motion.p>

                <div className="space-y-6">
                  <motion.h2 
                    className="text-lg font-medium text-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {priorKnowledgeQuestions[currentQuestion].question}
                  </motion.h2>

                  <div className="space-y-3">
                    {priorKnowledgeQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + index * 0.08, duration: 0.3 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(priorKnowledgeQuestions[currentQuestion].id, index)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          answers[priorKnowledgeQuestions[currentQuestion].id] === index
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{
                              scale: answers[priorKnowledgeQuestions[currentQuestion].id] === index ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ duration: 0.3 }}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              answers[priorKnowledgeQuestions[currentQuestion].id] === index
                                ? "border-primary bg-primary"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {answers[priorKnowledgeQuestions[currentQuestion].id] === index && (
                              <motion.div 
                                className="w-2 h-2 rounded-full bg-white"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                              />
                            )}
                          </motion.div>
                          <span className="text-foreground">{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-end mt-6">
          <motion.button
            onClick={handleNext}
            disabled={!canProceed()}
            whileHover={{ scale: canProceed() ? 1.02 : 1 }}
            whileTap={{ scale: canProceed() ? 0.98 : 1 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              canProceed()
                ? "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {step === "questions" && currentQuestion === priorKnowledgeQuestions.length - 1 ? "Start Learning" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default LearningReadiness;
