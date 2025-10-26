import { ChevronDown } from "lucide-react";
import { useState } from "react";

const QuestionCard = ({ number, question }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [displayAnswerNumber,setDisplayAnswerNumber] = useState(null)

  const handleShowAnswer = () => {
    setDisplayAnswerNumber(number)
    setShowAnswer(prev => !prev)
  }
  return (
    <div className="overflow-clip ">
      <div className="w-full h-full ">
        <div className="flex gap-x-2 items-center rounded-md bg-slate-200 text-[#254B8C] p-2">
          <span>
            <ChevronDown onClick={handleShowAnswer} />
          </span>
          <p className=" text-[16px] flex">{question.question}</p>
        </div>
        {showAnswer && displayAnswerNumber == number && <div className="text-white mt-2 shadow-md rounded-md bg-slate-200/20 backdrop-blur-2xl border-slate-200/30 p-4 mb-2">
          <p className=" font-thin text-sm ">{question.answer}</p>
        </div>}
      </div>
    </div>
  );
};
export default QuestionCard;
