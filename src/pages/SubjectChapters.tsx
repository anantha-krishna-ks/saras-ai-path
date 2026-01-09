import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, ChevronRight } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

interface Chapter {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "not-started";
}

interface SubjectData {
  name: string;
  icon: string;
  progress: number;
  chapters: Chapter[];
}

const subjectsData: Record<string, SubjectData> = {
  physics: {
    name: "Physics",
    icon: "⚡",
    progress: 45,
    chapters: [
      { id: "ch1", name: "Units and Measurements", status: "completed" },
      { id: "ch2", name: "Motion in a Straight Line", status: "completed" },
      { id: "ch3", name: "Motion in a Plane", status: "completed" },
      { id: "ch4", name: "Laws of Motion", status: "completed" },
      { id: "ch5", name: "Work, Energy and Power", status: "completed" },
      { id: "ch6", name: "System of Particles", status: "in-progress" },
      { id: "ch7", name: "Gravitation", status: "not-started" },
      { id: "ch8", name: "Mechanical Properties of Solids", status: "not-started" },
      { id: "ch9", name: "Mechanical Properties of Fluids", status: "not-started" },
      { id: "ch10", name: "Thermal Properties of Matter", status: "not-started" },
      { id: "ch11", name: "Thermodynamics", status: "not-started" },
      { id: "ch12", name: "Kinetic Theory", status: "not-started" },
      { id: "ch13", name: "Oscillations", status: "not-started" },
      { id: "ch14", name: "Waves", status: "not-started" },
      { id: "ch15", name: "Electric Charges and Fields", status: "not-started" },
    ],
  },
  chemistry: {
    name: "Chemistry",
    icon: "🧪",
    progress: 30,
    chapters: [
      { id: "ch1", name: "Some Basic Concepts of Chemistry", status: "completed" },
      { id: "ch2", name: "Structure of Atom", status: "completed" },
      { id: "ch3", name: "Classification of Elements", status: "completed" },
      { id: "ch4", name: "Chemical Bonding and Molecular Structure", status: "in-progress" },
      { id: "ch5", name: "States of Matter", status: "not-started" },
      { id: "ch6", name: "Thermodynamics", status: "not-started" },
      { id: "ch7", name: "Equilibrium", status: "not-started" },
      { id: "ch8", name: "Redox Reactions", status: "not-started" },
      { id: "ch9", name: "Hydrogen", status: "not-started" },
      { id: "ch10", name: "The s-Block Elements", status: "not-started" },
      { id: "ch11", name: "The p-Block Elements", status: "not-started" },
      { id: "ch12", name: "Organic Chemistry", status: "not-started" },
      { id: "ch13", name: "Hydrocarbons", status: "not-started" },
      { id: "ch14", name: "Environmental Chemistry", status: "not-started" },
      { id: "ch15", name: "The Solid State", status: "not-started" },
    ],
  },
  biology: {
    name: "Biology",
    icon: "🌱",
    progress: 60,
    chapters: [
      { id: "ch1", name: "The Living World", status: "completed" },
      { id: "ch2", name: "Biological Classification", status: "completed" },
      { id: "ch3", name: "Plant Kingdom", status: "completed" },
      { id: "ch4", name: "Animal Kingdom", status: "completed" },
      { id: "ch5", name: "Morphology of Flowering Plants", status: "completed" },
      { id: "ch6", name: "Anatomy of Flowering Plants", status: "completed" },
      { id: "ch7", name: "Structural Organisation in Animals", status: "in-progress" },
      { id: "ch8", name: "Cell: The Unit of Life", status: "not-started" },
      { id: "ch9", name: "Biomolecules", status: "not-started" },
      { id: "ch10", name: "Cell Cycle and Cell Division", status: "not-started" },
      { id: "ch11", name: "Transport in Plants", status: "not-started" },
      { id: "ch12", name: "Mineral Nutrition", status: "not-started" },
      { id: "ch13", name: "Photosynthesis", status: "not-started" },
      { id: "ch14", name: "Respiration in Plants", status: "not-started" },
      { id: "ch15", name: "Plant Growth and Development", status: "not-started" },
    ],
  },
  mathematics: {
    name: "Mathematics",
    icon: "📐",
    progress: 25,
    chapters: [
      { id: "ch1", name: "Sets", status: "completed" },
      { id: "ch2", name: "Relations and Functions", status: "completed" },
      { id: "ch3", name: "Trigonometric Functions", status: "in-progress" },
      { id: "ch4", name: "Complex Numbers", status: "not-started" },
      { id: "ch5", name: "Linear Inequalities", status: "not-started" },
      { id: "ch6", name: "Permutations and Combinations", status: "not-started" },
      { id: "ch7", name: "Binomial Theorem", status: "not-started" },
      { id: "ch8", name: "Sequences and Series", status: "not-started" },
      { id: "ch9", name: "Straight Lines", status: "not-started" },
      { id: "ch10", name: "Conic Sections", status: "not-started" },
      { id: "ch11", name: "Introduction to 3D Geometry", status: "not-started" },
      { id: "ch12", name: "Limits and Derivatives", status: "not-started" },
      { id: "ch13", name: "Mathematical Reasoning", status: "not-started" },
      { id: "ch14", name: "Statistics", status: "not-started" },
      { id: "ch15", name: "Probability", status: "not-started" },
    ],
  },
};

const SubjectChapters = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();

  const subject = subjectsData[subjectId || ""];

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Subject not found</p>
      </div>
    );
  }

  const completedCount = subject.chapters.filter(ch => ch.status === "completed").length;
  const inProgressChapter = subject.chapters.find(ch => ch.status === "in-progress");

  const handleChapterClick = (chapterId: string) => {
    navigate(`/readiness/${subjectId}?chapter=${chapterId}`);
  };

  const getStatusIcon = (status: Chapter["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />;
      case "in-progress":
        return <PlayCircle className="w-5 h-5 text-primary flex-shrink-0" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />;
    }
  };

  const getStatusBadge = (status: Chapter["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Continue
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </button>
          <div className="flex-1 flex justify-center">
            <BrandLogo />
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Subject Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
              {subject.icon}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{subject.name}</h1>
              <p className="text-muted-foreground">
                {completedCount} of {subject.chapters.length} chapters completed
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-4 border border-border/50">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium text-foreground">{subject.progress}%</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${subject.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Continue Learning Card */}
        {inProgressChapter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <button
              onClick={() => handleChapterClick(inProgressChapter.id)}
              className="w-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-5 border border-primary/20 hover:border-primary/40 transition-all text-left group"
            >
              <p className="text-xs font-medium text-primary mb-1">📚 Continue where you left off</p>
              <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {inProgressChapter.name}
              </p>
            </button>
          </motion.div>
        )}

        {/* Chapters List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            All Chapters
          </h2>
          <div className="bg-white rounded-xl border border-border/50 divide-y divide-border/50 overflow-hidden">
            {subject.chapters.map((chapter, index) => (
              <motion.button
                key={chapter.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                onClick={() => handleChapterClick(chapter.id)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors text-left group ${
                  chapter.status === "in-progress" ? "bg-primary/5" : ""
                }`}
              >
                <span className="text-sm text-muted-foreground w-6 flex-shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {getStatusIcon(chapter.status)}
                <span
                  className={`flex-1 text-sm font-medium ${
                    chapter.status === "completed"
                      ? "text-muted-foreground"
                      : "text-foreground group-hover:text-primary"
                  } transition-colors`}
                >
                  {chapter.name}
                </span>
                {getStatusBadge(chapter.status)}
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SubjectChapters;
