import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, TrendingUp, ChevronRight, Sparkles, User, LogOut, Settings } from "lucide-react";
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

interface Subject {
  id: string;
  name: string;
  icon: string;
  progress: number;
  lastAccessed: string;
  chaptersCompleted: number;
  totalChapters: number;
}

const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "⚡",
    progress: 45,
    lastAccessed: "2 hours ago",
    chaptersCompleted: 5,
    totalChapters: 15,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    progress: 30,
    lastAccessed: "Yesterday",
    chaptersCompleted: 3,
    totalChapters: 15,
  },
  {
    id: "biology",
    name: "Biology",
    icon: "🌱",
    progress: 60,
    lastAccessed: "3 days ago",
    chaptersCompleted: 6,
    totalChapters: 15,
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "📐",
    progress: 25,
    lastAccessed: "1 week ago",
    chaptersCompleted: 2,
    totalChapters: 15,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  });

  const { toast } = useToast();

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
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
            {subjects.map((subject, index) => (
              <motion.button
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                onClick={() => handleSubjectClick(subject.id)}
                className="bg-white rounded-xl p-5 border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 text-left group"
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
                        {subject.chaptersCompleted} of {subject.totalChapters} chapters
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
