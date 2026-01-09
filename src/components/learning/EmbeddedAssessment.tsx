import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, HelpCircle } from "lucide-react";

interface EmbeddedAssessmentProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Why do passengers lurch forward when a bus suddenly stops?",
    options: [
      "The bus pushes them forward",
      "Their bodies tend to keep moving forward due to inertia",
      "Gravity pulls them forward",
      "The air inside the bus pushes them",
    ],
    correctAnswer: 1,
    explanation: "Your body was moving with the bus. When the bus stops, your body wants to keep moving forward — that's inertia in action!",
  },
  {
    id: 2,
    question: "Which of these is an example of Newton's First Law?",
    options: [
      "A ball speeding up as it falls",
      "A rocket launching into space",
      "A book staying still on a table unless pushed",
      "Pushing a heavy box",
    ],
    correctAnswer: 2,
    explanation: "The book stays at rest (not moving) until an external force (your push) acts on it. This is exactly what Newton's First Law describes!",
  },
  {
    id: 3,
    question: "What is another name for Newton's First Law?",
    options: [
      "Law of Gravity",
      "Law of Acceleration",
      "Law of Inertia",
      "Law of Energy",
    ],
    correctAnswer: 2,
    explanation: "Newton's First Law is also called the Law of Inertia because it describes how objects resist changes to their state of motion.",
  },
];

const EmbeddedAssessment = ({ onComplete }: EmbeddedAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean }[]>([]);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, { questionId: questions[currentQuestion].id, correct: isCorrect }]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                index < currentQuestion
                  ? "bg-green-500"
                  : index === currentQuestion
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl border border-border/50 shadow-sm p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Quick Quiz</h2>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">
                {question.question}
              </h3>

              <div className="space-y-3">
                {question.options.map((option, index) => {
                  let buttonStyle = "border-border hover:border-primary/30";
                  if (showFeedback) {
                    if (index === question.correctAnswer) {
                      buttonStyle = "border-green-500 bg-green-50";
                    } else if (index === selectedAnswer && !isCorrect) {
                      buttonStyle = "border-red-300 bg-red-50";
                    }
                  } else if (selectedAnswer === index) {
                    buttonStyle = "border-primary bg-primary/5";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => !showFeedback && setSelectedAnswer(index)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${buttonStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            showFeedback && index === question.correctAnswer
                              ? "border-green-500 bg-green-500"
                              : showFeedback && index === selectedAnswer && !isCorrect
                              ? "border-red-400 bg-red-400"
                              : selectedAnswer === index
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/30"
                          }`}
                        >
                          {showFeedback && index === question.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                          {showFeedback && index === selectedAnswer && !isCorrect && (
                            <XCircle className="w-4 h-4 text-white" />
                          )}
                          {!showFeedback && selectedAnswer === index && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className={`${
                          showFeedback && index === question.correctAnswer
                            ? "text-green-700 font-medium"
                            : showFeedback && index === selectedAnswer && !isCorrect
                            ? "text-red-700"
                            : "text-foreground"
                        }`}>
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"
                  }`}
                >
                  <p className={`text-sm ${isCorrect ? "text-green-700" : "text-amber-700"}`}>
                    {question.explanation}
                  </p>
                </motion.div>
              )}

              {!showFeedback ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedAnswer !== null
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-200"
                >
                  {currentQuestion === questions.length - 1 ? "Complete" : "Next Question"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Encouragement message */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          💡 Take your time — this is about understanding, not speed!
        </p>
      </motion.div>
    </div>
  );
};

export default EmbeddedAssessment;
