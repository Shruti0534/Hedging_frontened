import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, FileQuestion } from "lucide-react";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import Quiz from "./Quiz";


const moduleContent = {
  

  "basis-fundamentals": {
    title: "Understanding Basis (Farmers)",
    videos: [
      {
        id: 1,
        title: "What is Basis? (Easy Example)",
        url: "/videos/v1.mp4",
        thumbnail: "/thumbnails/basis-1.jpg",
        duration: "08:12",
        readUrl: `
Begin with the concept introduction:
'Sometimes the futures market and spot market do not move equally. The difference between them is called the basis. When the basis moves in a favorable direction, farmers can earn extra profit, even beyond normal risk protection.'

Example:
Spot Price = ₹4,000
Futures Price = ₹4,050
Basis = +50

At harvest:
Spot Price falls to ₹3,700
Futures Price falls to ₹3,800
Basis widens to +100

Futures Profit = ₹4,050 – ₹3,800 = ₹250
Total Effective Price = ₹3,700 + ₹250 = ₹3,950

Key Point:
'Favorable basis movement can give farmers extra profit beyond normal hedging.'
`,
      },
      {
        id: 2,
        title: "Why Basis Changes? (Local Market Logic)",
        url: "/videos/v2.mp4",
        thumbnail: "/thumbnails/basis-2.jpg",
        duration: "10:42",
        readUrl: `
Hedging protects farmers from price fluctuations.
Example:
A farmer expects to harvest mustard in 2 months. Market price today: ₹4,000.
Hedge by selling a futures contract at ₹4,000.
At harvest, spot price = ₹3,600.
Futures Profit = ₹4,000 – ₹3,600 = ₹400
Final Effective Price = ₹4,000
Hedging ensures stable income.
`,
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Basics of Hedging Quiz",
        questions: [
          { id: 1, question: "What is the main purpose of hedging for farmers?", options: ["To maximize profit","To protect against price fluctuations","To predict market trends","To avoid harvesting crops"], answer: 1 },
          { id: 2, question: "Hedging primarily provides farmers with:", options: ["Price protection","Faster growth","Higher yield","Guaranteed profit"], answer: 0 },
          { id: 3, question: "Selling a futures contract helps the farmer:", options: ["Lock a price","Increase crop size","Reduce taxes","Increase storage time"], answer: 0 },
          { id: 4, question: "If spot prices fall, hedged farmers:", options: ["Lose money","Earn stable income","Always make extra profit","Cannot sell crops"], answer: 1 },
          { id: 5, question: "Hedging is a tool used in:", options: ["Commodity markets","Sports betting","Weather forecasting","Agricultural loans"], answer: 0 },
        ],
      },
    ],
  },

  "futures-contracts": {
    title: "Futures Market Predictions (Farmers)",
    videos: [
      {
        id: 1,
        title: "Understanding Futures Predictions",
        url: "/videos/v3.mp4",
        thumbnail: "/thumbnails/futures-predictions-1.jpg",
        duration: "09:20",
        readUrl: `
Futures market predictions help farmers estimate price movements.
Example:
- Crop: Wheat
- Current Spot Price: ₹2,500
- Futures Price 1 month: ₹2,550

By analyzing trends, farmers can decide whether to sell immediately or hedge.
Predictions are not guarantees, but useful for planning.
        `,
      },
      {
        id: 2,
        title: "How to Use Predictions for Selling",
        url: "/videos/v4.mp4",
        thumbnail: "/thumbnails/futures-predictions-2.jpg",
        duration: "08:50",
        readUrl: `
Farmers can use futures predictions to lock better prices.
- Example: If futures predict ₹2,600 in 1 month, farmer can hedge today at ₹2,550
- Avoid losses from price drops
- Make informed selling decisions
        `,
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Futures Predictions Quiz",
        questions: [
          { id: 1, question: "Futures predictions help farmers to:", options: ["Guarantee profit","Estimate price movements","Predict weather","Increase yield"], answer: 1 },
          { id: 2, question: "Predictions are:", options: ["100% accurate","Useful for planning","Useless","Illegal"], answer: 1 },
          { id: 3, question: "Using predictions, a farmer can:", options: ["Lock better prices","Change weather","Increase storage","Get subsidies"], answer: 0 },
        ],
      },
    ],
  },

  // Add other modules similarly...
};


export default function ModulePage() {
  const { moduleId } = useParams();
  const [openRead, setOpenRead] = useState<number | null>(null);

  // Normalize moduleId to match your keys
  const key = moduleId?.toLowerCase().replace(/\s+/g, "-");
  const content = key ? moduleContent[key as keyof typeof moduleContent] : undefined;

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Module not found.
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-8">
  {/* Title */}
  <h1 className="font-display text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 capitalize text-center sm:text-left">
    {content.title}
  </h1>

{/* Videos Section */}

  <section className="mb-8 sm:mb-12">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-0">Video Lessons</h2>
      <span className="text-sm text-muted-foreground">{content.videos.length} total</span>
    </div>

```
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {content.videos.map((video) => (
    <div
      key={video.id}
      className="border rounded-xl bg-card shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3"
    >
      {/* Video Player */}
      <div className="relative">
        <video
          src={video.url}
          controls
          poster={video.thumbnail}
          className="rounded-lg w-full h-40 sm:h-48 md:h-56 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      {/* Video Title */}
      <h3 className="font-medium text-sm sm:text-base leading-tight">{video.title}</h3>

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

      {/* Watch / Read Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-auto">
        <a
          href={video.url}
          target="_blank"
          className="flex items-center justify-center gap-2 text-primary border rounded-md py-2 px-3 hover:bg-primary hover:text-white transition w-full sm:w-auto"
        >
          <Play className="w-4 h-4" /> Watch Video
        </a>
        <button
          onClick={() => setOpenRead(openRead === video.id ? null : video.id)}
          className="flex items-center justify-center gap-2 text-primary border rounded-md py-2 px-3 hover:bg-primary hover:text-white transition w-full sm:w-auto"
        >
          <BookOpen className="w-4 h-4" /> Read
        </button>
      </div>
      {openRead === video.id && (
        <div className="mt-2 p-3 border rounded-md bg-gray-50 text-sm text-gray-800">
          {video.readUrl || "No content available."}
        </div>
      )}
    </div>
  ))}
</div>
```

  </section>

{/* Quizzes Section */}

  <section>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-0">Quizzes</h2>
      <span className="text-sm text-muted-foreground">{content.quizzes.length} quizzes</span>
    </div>

```
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {content.quizzes.map((quiz) => {
    const [showQuiz, setShowQuiz] = useState(false);

    return (
      <div
        key={quiz.id}
        className="border rounded-xl bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition flex flex-col gap-3"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <FileQuestion className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          <h3 className="font-semibold text-sm sm:text-base">{quiz.title}</h3>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Test your understanding with this quiz.
        </p>

        {!showQuiz ? (
          <Button
            variant="outline"
            className="mt-auto flex gap-2 w-full sm:w-auto"
            onClick={() => setShowQuiz(true)}
          >
            Start Quiz <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <div className="mt-4 w-full">
            <Quiz questions={quiz.questions} />
            <Button
              variant="outline"
              className="mt-2 flex gap-2 w-full sm:w-auto"
              onClick={() => setShowQuiz(false)}
            >
              Close Quiz
            </Button>
          </div>
        )}
      </div>
    );
  })}
</div>
```

  </section>
</div>

  );
}
