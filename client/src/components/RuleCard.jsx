import { ArrowBigDown, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { useState } from "react";

const RuleCard = ({ rule }) => {
  const [showDetailed, setShowDetailed] = useState(false);
  return (
    <div className="rounded-[15px] bg-dark-blue/5 backdrop-blur-2xl">
      <div className="w-full h-full  shadow-md border border-dark-white/10 rounded-lg overflow-hidden ">
        <span
          onClick={() => setShowDetailed((prev) => !prev)}
          className="flex justify-between items-center border-b border-dark-white/10 p-2"
        >
          <h2 className="text-lg font-semibold p-2  text-center text-dark-white/80">
            {rule.category}
          </h2>
          <ChevronDownIcon
            className={`text-dark-white/40 transition-transform ease-in-out duration-200 ${
              showDetailed ? "rotate-180" : ""
            }`}
            size={18}
          />
        </span>
        {showDetailed && (
          <ul className="flex flex-col gap-y-2 p-4 pl-8 text-[16px] font-thin list-disc text-dark-white/60 text-sm">
            {rule.rules.map((r, index) => (
              <li key={index}>
                <p className="leading-6">{r}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default RuleCard