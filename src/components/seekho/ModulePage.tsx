import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, FileQuestion } from "lucide-react";
import { BookOpen } from "lucide-react";
const moduleContent = {
  "hedging-introduction": {
    title: "What is Hedging? (Basic for Farmers)",
    videos: [
      {
        id: 1,
        title: "Hedging Explained Simply for Farmers",
        url: "https://youtu.be/example1",
        thumbnail: "/thumbnails/hedging-intro-1.jpg",
        duration: "07:45",
      },
      {
        id: 2,
        title: "Why Farmers Need Hedging?",
        url: "https://youtu.be/example2",
        thumbnail: "/thumbnails/hedging-intro-2.jpg",
        duration: "06:20",
      },
    ],
    quizzes: [{ id: 1, title: "Basics of Hedging Quiz" }],
  },

  "basis-fundamentals": {
    title: "Understanding Basis (Farmers)",
    videos: [
      {
        id: 1,
        title: "What is Basis? (Easy Example)",
        url: "https://youtu.be/example3",
        thumbnail: "/thumbnails/basis-1.jpg",
        duration: "08:12",
      },
      {
        id: 2,
        title: "Why Basis Changes? (Local Market Logic)",
        url: "https://youtu.be/example4",
        thumbnail: "/thumbnails/basis-2.jpg",
        duration: "10:42",
      },
    ],
    quizzes: [{ id: 1, title: "Basis Quick Quiz" }],
  },

  "futures-contracts": {
    title: "Futures Contracts for Farmers",
    videos: [
      {
        id: 1,
        title: "What is a Futures Contract?",
        url: "https://youtu.be/example5",
        thumbnail: "/thumbnails/futures-1.jpg",
        duration: "12:21",
      },
      {
        id: 2,
        title: "How Farmers Use Futures for Price Protection",
        url: "https://youtu.be/example6",
        thumbnail: "/thumbnails/futures-2.jpg",
        duration: "09:55",
      },
    ],
    quizzes: [{ id: 1, title: "Futures Basics Quiz" }],
  },

  "hedging-strategies": {
    title: "Simple Hedging Strategies for Farmers",
    videos: [
      {
        id: 1,
        title: "Sell Hedge for Farmers (Most Common)",
        url: "https://youtu.be/example7",
        thumbnail: "/thumbnails/strategy-1.jpg",
        duration: "11:00",
      },
      {
        id: 2,
        title: "Buy Hedge for Buyers/Traders",
        url: "https://youtu.be/example8",
        thumbnail: "/thumbnails/strategy-2.jpg",
        duration: "09:10",
      },
    ],
    quizzes: [{ id: 1, title: "Hedging Strategy Quiz" }],
  },

  "market-factors": {
    title: "Factors That Affect Crop Prices",
    videos: [
      {
        id: 1,
        title: "Rainfall, MSP, Demand–Supply Impact",
        url: "https://youtu.be/example9",
        thumbnail: "/thumbnails/market-1.jpg",
        duration: "13:14",
      },
      {
        id: 2,
        title: "International Market & Commodity Price Shifts",
        url: "https://youtu.be/example10",
        thumbnail: "/thumbnails/market-2.jpg",
        duration: "10:05",
      },
    ],
    quizzes: [{ id: 1, title: "Market Factors Quiz" }],
  },

  "real-farmer-examples": {
    title: "Real Hedging Examples from Farmers",
    videos: [
      {
        id: 1,
        title: "Farmer Protected Wheat Prices (Real Story)",
        url: "https://youtu.be/example11",
        thumbnail: "/thumbnails/example-1.jpg",
        duration: "08:55",
      },
      {
        id: 2,
        title: "Soybean Farmer Case Study",
        url: "https://youtu.be/example12",
        thumbnail: "/thumbnails/example-2.jpg",
        duration: "07:40",
      },
    ],
    quizzes: [{ id: 1, title: "Case Study Quiz" }],
  },
};

export default function ModulePage() {
  const { moduleId } = useParams();
  const content = moduleContent[moduleId as keyof typeof moduleContent];

  // ❌ Handle invalid module ID
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Module not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background container py-8">
      {/* Title */}
      <h1 className="font-display text-3xl font-bold mb-8 capitalize">
        {moduleId?.replace("-", " ")}
      </h1>

      {/* Videos Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Video Lessons</h2>
          <span className="text-sm text-muted-foreground">
            {content?.videos.length} total
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.videos.map((video) => (
            <div
              key={video.id}
              className="border rounded-xl bg-card shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-medium text-base leading-tight">
                {video.title}
              </h3>

              {/* Quality Selector */}
              <select className="border text-sm rounded-md px-2 py-1">
                <option>Auto</option>
                <option>144p</option>
                <option>240p</option>
                <option>360p</option>
                <option>480p</option>
                <option>720p HD</option>
                <option>1080p FHD</option>
              </select>

              {/* Watch Button */}
              <a
                href={video.url}
                target="_blank"
                className="flex items-center justify-center gap-2 text-primary mt-auto border rounded-md py-2 hover:bg-primary hover:text-white transition"
              >
                <Play className="w-4 h-4" />
                Watch Video
              </a>
              <a href={video.readUrl} target="_blank" className="flex items-center justify-center gap-2 text-primary mt-auto border rounded-md py-2 hover:bg-primary hover:text-white transition" > <BookOpen className="w-4 h-4" /> Read </a>
              
            </div>
          ))}
        </div>
      </section>

      {/* Quizzes Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quizzes</h2>
          <span className="text-sm text-muted-foreground">
            {content?.quizzes.length} quizzes
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="border rounded-xl bg-card p-5 shadow-sm hover:shadow-md transition flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <FileQuestion className="w-6 h-6 text-primary" />
                <h3 className="font-semibold">{quiz.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Test your understanding with this quiz.
              </p>
              <Button variant="outline" className="mt-auto flex gap-2">
                Start Quiz <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
