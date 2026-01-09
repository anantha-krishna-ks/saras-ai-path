import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, TrendingUp, ChevronRight, ChevronDown, Sparkles, User, LogOut, Settings, CheckCircle2, Circle, PlayCircle } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Chapter {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "not-started";
  duration: string;
}

interface Subject {
  id: string;
  name: string;
  icon: string;
  progress: number;
  lastAccessed: string;
  conceptsCompleted: number;
  totalConcepts: number;
  chapters: Chapter[];
}

const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "⚡",
    progress: 45,
    lastAccessed: "2 hours ago",
    conceptsCompleted: 5,
    totalConcepts: 12,
    chapters: [
      { id: "ch1", name: "Units and Measurements", status: "completed", duration: "45 min" },
      { id: "ch2", name: "Motion in a Straight Line", status: "completed", duration: "1 hr" },
      { id: "ch3", name: "Newton's Laws of Motion", status: "in-progress", duration: "1.5 hr" },
      { id: "ch4", name: "Work, Energy and Power", status: "not-started", duration: "1 hr" },
      { id: "ch5", name: "Gravitation", status: "not-started", duration: "1.5 hr" },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    progress: 30,
    lastAccessed: "Yesterday",
    conceptsCompleted: 3,
    totalConcepts: 10,
    chapters: [
      { id: "ch1", name: "Some Basic Concepts of Chemistry", status: "completed", duration: "40 min" },
      { id: "ch2", name: "Structure of Atom", status: "completed", duration: "1 hr" },
      { id: "ch3", name: "Classification of Elements", status: "in-progress", duration: "50 min" },
      { id: "ch4", name: "Chemical Bonding", status: "not-started", duration: "1.5 hr" },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    icon: "🌱",
    progress: 60,
    lastAccessed: "3 days ago",
    conceptsCompleted: 6,
    totalConcepts: 10,
    chapters: [
      { id: "ch1", name: "The Living World", status: "completed", duration: "35 min" },
      { id: "ch2", name: "Biological Classification", status: "completed", duration: "45 min" },
      { id: "ch3", name: "Plant Kingdom", status: "completed", duration: "1 hr" },
      { id: "ch4", name: "Animal Kingdom", status: "in-progress", duration: "1.5 hr" },
      { id: "ch5", name: "Morphology of Plants", status: "not-started", duration: "1 hr" },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "📐",
    progress: 25,
    lastAccessed: "1 week ago",
    conceptsCompleted: 2,
    totalConcepts: 8,
    chapters: [
      { id: "ch1", name: "Sets", status: "completed", duration: "40 min" },
      { id: "ch2", name: "Relations and Functions", status: "in-progress", duration: "1 hr" },
      { id: "ch3", name: "Trigonometric Functions", status: "not-started", duration: "1.5 hr" },
      { id: "ch4", name: "Complex Numbers", status: "not-started", duration: "1 hr" },
    ],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  });

  const { toast } = useToast();

  const handleSubjectClick = (subjectId: string) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  const handleChapterClick = (subjectId: string, chapterId: string) => {
    navigate(`/readiness/${subjectId}?chapter=${chapterId}`);
  };

  const getStatusIcon = (status: Chapter["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <PlayCircle className="w-5 h-5 text-primary" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground/50" />;
    }
  };

  const getStatusBadge = (status: Chapter["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
            In Progress
          </span>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you next time, Ananya!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <BrandLogo />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full transition-all hover:scale-105">
                <Avatar className="h-10 w-10 cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    AS
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg border border-border/50">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-foreground">Ananya Sharma</p>
                  <p className="text-xs text-muted-foreground">ananya@school.edu</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            {greeting}, Ananya! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey?
          </p>
        </motion.div>

        {/* Continue Learning Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Continue where you left off</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Newton's Laws of Motion
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Physics • Chapter 3
                </p>
                <button
                  onClick={() => navigate("/readiness/physics")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors"
                >
                  Resume Learning
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="hidden sm:flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-sm">
                <span className="text-4xl">⚡</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">16</p>
                <p className="text-xs text-muted-foreground">Concepts learned</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Day streak</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">2.5h</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subjects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject, index) => {
              const isExpanded = expandedSubject === subject.id;
              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className={`bg-white rounded-xl border shadow-sm transition-all duration-200 ${
                    isExpanded ? "border-primary/30 shadow-md" : "border-border/50 hover:shadow-md hover:border-primary/20"
                  }`}
                >
                  {/* Subject Header */}
                  <button
                    onClick={() => handleSubjectClick(subject.id)}
                    className="w-full p-5 text-left group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                          {subject.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {subject.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {subject.chapters.length} chapters • {subject.conceptsCompleted} of {subject.totalConcepts} concepts
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{subject.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last accessed {subject.lastAccessed}
                      </p>
                    </div>
                  </button>

                  {/* Chapters List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-2 border-t border-border/50">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                            Chapters
                          </p>
                          <div className="space-y-2">
                            {subject.chapters.map((chapter, chapterIndex) => (
                              <motion.button
                                key={chapter.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: chapterIndex * 0.05 }}
                                onClick={() => handleChapterClick(subject.id, chapter.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left group/chapter ${
                                  chapter.status === "in-progress"
                                    ? "bg-primary/5 hover:bg-primary/10"
                                    : "hover:bg-muted/50"
                                }`}
                              >
                                {getStatusIcon(chapter.status)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm font-medium truncate ${
                                      chapter.status === "completed" 
                                        ? "text-muted-foreground" 
                                        : "text-foreground group-hover/chapter:text-primary"
                                    }`}>
                                      {chapter.name}
                                    </span>
                                    {getStatusBadge(chapter.status)}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {chapter.duration}
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover/chapter:text-primary group-hover/chapter:translate-x-1 transition-all" />
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
