import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quizData = [
{
question: "A wheat farmer expects market prices to fall after harvest. What can he do to protect his income?",
options: [
"Sell wheat futures contracts",
"Store the wheat and hope for better prices",
"Plant a different crop immediately",
"Ignore the market"
],
answer: 0
},
{
question: "Why do farmers use hedging strategies for crops?",
options: [
"To reduce the risk of price fluctuations",
"To increase water usage",
"To get government subsidies",
"To sell more crops at any price"
],
answer: 0
},
{
question: "A maize farmer locks in the price for his crop today for delivery in 3 months. This is called:",
options: [
"Hedging",
"Speculation",
"Crop rotation",
"Direct selling"
],
answer: 0
},
{
question: "Which of the following crops are commonly hedged in commodity markets?",
options: ["Wheat", "Corn", "Soybean", "All of the above"],
answer: 3
},
{
question: "If a farmer has already sold futures for his cotton crop, what happens if market prices rise?",
options: [
"He still receives the pre-agreed price from the futures contract",
"He gets the new higher market price",
"He loses money automatically",
"He can cancel the contract anytime"
],
answer: 0
},
{
question: "What is the main benefit of hedging for small farmers?",
options: [
"Income stability and protection from price drops",
"Guaranteed government loans",
"Higher crop yield",
"Less work during harvest"
],
answer: 0
}
];

export function DailyQuiz() {
const navigate = useNavigate();
const [current, setCurrent] = useState(0);
const [selected, setSelected] = useState<number | null>(null);
const [score, setScore] = useState(0);
const [finished, setFinished] = useState(false);
const [showAnswer, setShowAnswer] = useState(false);

const handleNext = () => {
if (selected === quizData[current].answer) {
setScore(score + 1);
}
setShowAnswer(true);
};

const handleContinue = () => {
setSelected(null);
setShowAnswer(false);
if (current + 1 < quizData.length) {
setCurrent(current + 1);
} else {
setFinished(true);
}
};

const handleRetry = () => {
setCurrent(0);
setSelected(null);
setScore(0);
setFinished(false);
setShowAnswer(false);
};

const progressValue = ((current + (finished ? 1 : 0)) / quizData.length) * 100;

return ( <div className="max-w-xl mx-auto p-6 bg-background/90 rounded-2xl shadow-xl mt-10">
{!finished ? (
<> <div className="flex justify-between items-center mb-4"> <h2 className="font-bold text-lg text-foreground">Daily Quiz</h2> <div className="flex items-center gap-1 text-xp font-semibold"> <Zap className="w-5 h-5" /> <span>+150 XP</span> </div> </div>

```
      <Progress value={progressValue} indicatorClassName="gradient-gold h-3 rounded-full mb-6" />

      <div className="mb-4 p-4 bg-white/80 rounded-xl shadow hover:shadow-lg transition-shadow">
        <p className="text-foreground font-semibold text-md mb-4">
          Q{current + 1}. {quizData[current].question}
        </p>
        <div className="flex flex-col gap-3">
          {quizData[current].options.map((option, idx) => {
            const isCorrect = quizData[current].answer === idx;
            const isSelected = selected === idx;
            let bgClass = "bg-white hover:bg-primary/10";
            if (showAnswer) {
              if (isCorrect) bgClass = "bg-green-200 border-green-500";
              else if (isSelected && !isCorrect) bgClass = "bg-red-200 border-red-500";
            } else if (isSelected) {
              bgClass = "bg-primary/20 border-primary";
            }

            return (
              <button
                key={idx}
                className={`p-3 rounded-lg border text-left transition-colors ${bgClass}`}
                onClick={() => !showAnswer && setSelected(idx)}
                disabled={showAnswer}
              >
                <div className="flex items-center gap-2">
                  {showAnswer && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {showAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        size="md"
        className="w-full mt-4"
        onClick={showAnswer ? handleContinue : handleNext}
        disabled={selected === null && !showAnswer}
      >
        {showAnswer ? (current + 1 === quizData.length ? "Finish" : "Next Question") : "Check Answer"}
      </Button>
    </>
  ) : (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-muted-foreground mb-6">
        You scored {score}/{quizData.length} correct answers.
      </p>
      <div className="flex justify-center items-center gap-2 mb-6 text-xp font-bold text-xl">
        <Zap className="w-6 h-6" />
        <span>+{score * 50} XP Earned!</span>
      </div>
      <div className="flex gap-3 justify-center">
        <Button onClick={handleRetry}>Retry Quiz</Button>
        <Button variant="secondary" onClick={() => navigate("/seekho")}>
          Back to Home
        </Button>
      </div>
    </div>
  )}
</div>


);
}
