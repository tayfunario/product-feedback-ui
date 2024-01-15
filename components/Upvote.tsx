import { FaChevronUp } from "react-icons/fa";
import { useState, MouseEvent } from "react";

export default function Upvote({
  upvoteNum,
  isHorizontal,
}: {
  upvoteNum: number;
  isHorizontal?: boolean;
}) {
  const [currentUpvoteNum, setCurrentUpvoteNum] = useState(upvoteNum);

  const handleBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentUpvoteNum((currentUpvoteNum) =>
      currentUpvoteNum === upvoteNum ? currentUpvoteNum + 1 : upvoteNum
    );
  };

  return (
    <div className="flex justify-center items-start pr-3">
      <button
        className={`flex justify-between items-center w-16 px-3 py-[6px] bold-13 rounded-lg ${
          isHorizontal ? "" : "md:flex-col md:w-10"
        }
        ${
          currentUpvoteNum === upvoteNum
            ? "bg-F2F hover:bg-CFD"
            : "bg-466 text-white"
        }
         `}
        onClick={(e) => handleBtn(e)}
      >
        <FaChevronUp
          className={`w-[10px] ${
            currentUpvoteNum === upvoteNum ? "text-466" : "text-white"
          }`}
        />
        <p>{currentUpvoteNum}</p>
      </button>
    </div>
  );
}
