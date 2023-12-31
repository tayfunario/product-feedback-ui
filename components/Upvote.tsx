import { FaChevronUp } from "react-icons/fa";

export default function Upvote() {
  return (
    <button className="upvote-btn flex justify-between items-center bold-13 w-16 bg-F2F rounded-lg px-3 py-[6px] hover:bg-CFD focus:bg-466 focus:text-white">
      <FaChevronUp className="upvote-icon w-[10px] text-466" />
      83
    </button>
  );
}
