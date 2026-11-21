import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  BookOpen,
  Wheat
} from "lucide-react";

const lessonContent: Record<string, { 
  moduleTitle: string;
  lessons: { id: number; title: string; content: string; completed: boolean }[];
  currentLesson: number;
}> = {
  "basis-fundamentals": {
    moduleTitle: "Basis Fundamentals",
    currentLesson: 1,
    lessons: [
      { id: 1, title: "What is Basis?", content: "Basis is the difference between the local cash price and the futures price. Understanding basis is crucial for effective hedging strategies in oilseed markets.", completed: true },
      { id: 2, title: "Local Price Dynamics", content: "Local prices are influenced by supply, demand, transportation costs, and storage availability in your region.", completed: true },
      { id: 3, title: "Calculating Basis", content: "Basis = Cash Price - Futures Price. A negative basis means cash prices are below futures.", completed: true },
      { id: 4, title: "Basis Patterns", content: "Basis typically narrows as delivery approaches due to convergence between cash and futures markets.", completed: true },
      { id: 5, title: "Using Basis in Hedging", content: "By understanding basis patterns, you can time your hedges to lock in favorable prices.", completed: true },
    ]
  },
  "futures-contracts": {
    moduleTitle: "Futures Contracts",
    currentLesson: 6,
    lessons: [
      { id: 1, title: "Introduction to Futures", content: "Futures contracts are standardized agreements to buy or sell a commodity at a predetermined price on a specific future date.", completed: true },
      { id: 2, title: "Contract Specifications", content: "Each futures contract has specific terms including contract size, delivery months, and quality specifications.", completed: true },
      { id: 3, title: "Margin Requirements", content: "Initial margin and maintenance margin are required to hold futures positions.", completed: true },
      { id: 4, title: "Long vs Short Positions", content: "Going long means buying futures (betting price will rise), going short means selling futures (betting price will fall).", completed: true },
      { id: 5, title: "Hedging with Futures", content: "Producers typically sell futures to lock in prices, while buyers purchase futures to secure supply costs.", completed: true },
      { id: 6, title: "Rolling Contracts", content: "Learn when and how to roll positions from one contract month to another.", completed: false },
      { id: 7, title: "Basis Risk in Futures", content: "Understanding how basis affects your hedge effectiveness.", completed: false },
      { id: 8, title: "Practical Exercises", content: "Apply your knowledge with real-world hedging scenarios.", completed: false },
    ]
  },
  "options-strategies": {
    moduleTitle: "Options Strategies",
    currentLesson: 3,
    lessons: [
      { id: 1, title: "Options Basics", content: "Options give the holder the right, but not the obligation, to buy or sell at a strike price.", completed: true },
      { id: 2, title: "Calls and Puts", content: "Call options benefit from rising prices, put options benefit from falling prices.", completed: true },
      { id: 3, title: "Premium Factors", content: "Option premiums are influenced by time value, volatility, and intrinsic value.", completed: false },
      { id: 4, title: "Protective Puts", content: "Use puts to protect downside while maintaining upside potential.", completed: false },
      { id: 5, title: "Covered Calls", content: "Generate income by selling calls against inventory.", completed: false },
      { id: 6, title: "Spreads Overview", content: "Combine options to create defined risk strategies.", completed: false },
      { id: 7, title: "Bull and Bear Spreads", content: "Directional strategies using multiple options.", completed: false },
      { id: 8, title: "Collar Strategy", content: "Combine puts and calls for cost-effective protection.", completed: false },
      { id: 9, title: "Options Greeks", content: "Understand delta, gamma, theta, and vega.", completed: false },
      { id: 10, title: "Building Your Strategy", content: "Create a personalized options hedging plan.", completed: false },
    ]
  },
};

export default function Lesson() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  
  const module = moduleId ? lessonContent[moduleId] : null;
  
  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Module not found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const currentLessonData = module.lessons[module.currentLesson - 1];
  const completedCount = module.lessons.filter(l => l.completed).length;
  const progress = Math.round((completedCount / module.lessons.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b pr-16">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Wheat className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold text-foreground hidden sm:block">
                {module.moduleTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-xp fill-current" />
              <span className="font-semibold text-xp">+100 XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b bg-card">
        <div className="container py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Lesson {module.currentLesson} of {module.lessons.length}
            </span>
            <Progress value={progress} className="flex-1 h-2" indicatorClassName="bg-primary" />
            <span className="text-sm font-semibold text-foreground">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Lesson Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Lesson {currentLessonData.id}</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              {currentLessonData.title}
            </h1>
          </div>

          {/* Lesson Content */}
          <div className="bg-card border rounded-2xl p-8 mb-8">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              {currentLessonData.content}
            </p>

            <div className="bg-secondary/50 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Key Takeaway</h3>
              <p className="text-muted-foreground">
                Understanding this concept is fundamental to building effective hedging strategies
                for your oilseed portfolio.
              </p>
            </div>
          </div>

          {/* Lesson Navigation */}
          <div className="bg-card border rounded-2xl p-6">
            <h3 className="font-display font-bold text-foreground mb-4">Lessons in this Module</h3>
            <div className="space-y-2">
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    lesson.id === module.currentLesson 
                      ? "bg-primary/10 border border-primary/30" 
                      : lesson.completed 
                        ? "bg-success/5" 
                        : "hover:bg-secondary"
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                      lesson.id === module.currentLesson ? "border-primary" : "border-muted"
                    }`} />
                  )}
                  <span className={`text-sm ${
                    lesson.id === module.currentLesson 
                      ? "font-semibold text-foreground" 
                      : lesson.completed 
                        ? "text-foreground" 
                        : "text-muted-foreground"
                  }`}>
                    {lesson.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              disabled={module.currentLesson === 1}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button>
              {module.currentLesson === module.lessons.length ? (
                <>
                  Complete Module
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next Lesson
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
