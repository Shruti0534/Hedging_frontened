import { useState } from "react";
import { Button } from "@/components/ui/button";

interface QuizQuestion {
id: number;
question: string;
options: string[];
answer: number; // index of correct option
}

interface QuizProps {
questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
const [current, setCurrent] = useState(0);
const [selected, setSelected] = useState<number | null>(null);
const [score, setScore] = useState(0);
const [showResult, setShowResult] = useState(false);

const handleOptionClick = (index: number) => {
setSelected(index);
if (index === questions[current].answer) {
setScore((prev) => prev + 1);
}
};

const handleNext = () => {
setSelected(null);
if (current + 1 < questions.length) {
setCurrent((prev) => prev + 1);
} else {
setShowResult(true);
}
};

if (showResult) {
return ( <div className="p-4 border rounded-md bg-card text-center"> <h2 className="text-xl font-bold mb-2">Quiz Completed!</h2> <p className="text-lg">
Your Score: {score} / {questions.length} </p> </div>
);
}

const question = questions[current];

return ( <div className="p-4 border rounded-md bg-card flex flex-col gap-4"> <h3 className="font-semibold text-lg">
Q{current + 1}: {question.question} </h3>

```
  <div className="flex flex-col gap-2">
    {question.options.map((opt, idx) => {
      const isCorrect = idx === question.answer;
      const isSelected = idx === selected;
      let bgColor = "bg-card";
      if (selected !== null) {
        if (isCorrect) bgColor = "bg-accent";
        else if (isSelected && !isCorrect) bgColor = "bg-red-200";
      }

      return (
        <button
          key={idx}
          onClick={() => handleOptionClick(idx)}
          disabled={selected !== null}
          className={`text-left p-2 border rounded-md hover:bg-muted transition ${bgColor}`}
        >
          {opt}
        </button>
      );
    })}
  </div>

  {selected !== null && (
    <Button onClick={handleNext} className="mt-2 self-end">
      {current + 1 < questions.length ? "Next" : "Finish"}
    </Button>
  )}
</div>


);
}
