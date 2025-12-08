// Updated Seekho Page — Oilseed references removed & CSS cleaned
//import { Header } from "../components/seekho/Header"; 
import { useNavigate } from "react-router-dom";

import { ModuleCard } from "../components/seekho/ModuleCard";
import { AchievementBadge } from "../components/seekho/AchievementBadge";
import { LearningPath } from "../components/seekho/LearningPath";
import { DailyChallenge } from "../components/seekho/DailyChallenge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Shield, 
  BarChart3, 
  LineChart, 
  Target,
  BookOpen,
  ArrowRight,
  Wheat,
  Award,
  Rocket
} from "lucide-react";
import MobileFrame from "../components/layout/MobileFrame";
 

const modules = [
  {
    id: "basis-fundamentals",
    title: "Basis Fundamentals",
    description: "Learn the core concepts of basis trading and local price dynamics.",
    icon: <BookOpen className="w-7 h-7 text-primary" />,
    progress: 100,
    lessons: 2,
    completedLessons: 2,
    xpReward: 500,
    isCompleted: true,
  },
  {
    id: "futures-contracts",
    title: "Futures Contracts",
    description: "Master the mechanics of futures trading across major commodity markets.",
    icon: <TrendingUp className="w-7 h-7 text-primary" />,
    progress: 50,
    lessons: 2,
    completedLessons: 1,
    xpReward: 800,
  },
  {
    id: "options-strategies",
    title: "Options Strategies",
    description: "Explore puts, calls, and spreads to protect margins and capture upside.",
    icon: <Shield className="w-7 h-7 text-primary" />,
    progress: 0,
    lessons: 10,
    completedLessons: 0,
    xpReward: 1000,
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description: "Build comprehensive risk frameworks for diversified commodity portfolios.",
    icon: <BarChart3 className="w-7 h-7 text-muted-foreground" />,
    progress: 0,
    lessons: 6,
    completedLessons: 0,
    xpReward: 600,
    isLocked: true,
  },
  {
    id: "market-analysis",
    title: "Market Analysis",
    description: "Technical and fundamental analysis techniques for commodity markets.",
    icon: <LineChart className="w-7 h-7 text-muted-foreground" />,
    progress: 0,
    lessons: 7,
    completedLessons: 0,
    xpReward: 700,
    isLocked: true,
  },
  {
    id: "advanced-hedging",
    title: "Advanced Hedging",
    description: "Complex multi-leg strategies and cross-commodity hedging approaches.",
    icon: <Target className="w-7 h-7 text-muted-foreground" />,
    progress: 0,
    lessons: 12,
    completedLessons: 0,
    xpReward: 1200,
    isLocked: true,
  },
];

const pathNodes = [
  { id: 1, title: "Understanding Basis", status: "completed" },
  { id: 2, title: "Futures 101", status: "completed" },
  { id: 3, title: "Hedging with Futures", status: "current" },
  { id: 4, title: "Options Basics", status: "locked" },
  { id: 5, title: "Advanced Strategies", status: "locked" },
];

const achievements = [
  { title: "First Steps", icon: "🌱", isUnlocked: true, description: "Complete your first lesson" },
  { title: "Basis Master", icon: "📊", isUnlocked: true, description: "Complete the Basis module" },
  { title: "Week Warrior", icon: "🔥", isUnlocked: true, description: "7-day learning streak" },
  { title: "Options Pro", icon: "🛡️", isUnlocked: false, description: "Complete Options module" },
  { title: "Risk Expert", icon: "⚖️", isUnlocked: false, description: "Complete Risk Management" },
  { title: "Market Sage", icon: "🔮", isUnlocked: false, description: "Complete all modules" },
];

export default function Seekho() {
  const overallProgress = 35;
  const completedModules = 1;
  const totalModules = 6;
  const navigate = useNavigate();

  return (
    

    <div className="min-h-screen bg-background p-8">
      <main className="container py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                Master Commodity<br />
                <span className="text-primary">Hedging Strategies</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                Interactive lessons, real-world scenarios, and gamified challenges built to
                strengthen your commodity hedging skills.
              </p>

              
            </div>

            <div className="w-full lg:w-96">
              <DailyChallenge />
            </div>
          </div>
        </section>

        {/* Progress Overview */}
        <section className="mb-12">
          <div className="bg-card border rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">Your Progress</h2>
                <p className="text-muted-foreground">
                  {completedModules} of {totalModules} modules completed
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-bold text-foreground">{overallProgress}%</p>
                <p className="text-sm text-muted-foreground">Overall completion</p>
              </div>
            </div>
            <Progress value={overallProgress} className="h-4" indicatorClassName="bg-primary" />
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-xp" />
              <h2 className="font-display text-xl font-bold text-foreground">Achievements</h2>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {achievements.map((achievement, index) => (
              <AchievementBadge
                key={index}
                title={achievement.title}
                icon={achievement.icon}
                isUnlocked={achievement.isUnlocked}
                description={achievement.description}
              />
            ))}
          </div>
        </section>

        {/* Modules */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-6 h-6 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">Learning Modules</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <ModuleCard key={index} index={index} {...module} />
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-level" />
              <h2 className="font-display text-xl font-bold text-foreground">Learning Path</h2>
            </div>

            <div className="bg-card border rounded-2xl p-4">
              <LearningPath nodes={pathNodes} />
            </div>
          </div>
        </div>
      </main>

    
    </div>
    
  );
}
