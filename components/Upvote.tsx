import { FaChevronUp } from "react-icons/fa";

export default function Upvote({ isHorizontal }: { isHorizontal?: boolean }) {
  return (
    <div className="flex justify-center items-start pr-3">
      <button
        className={`upvote-btn flex ${
          isHorizontal ? "" : "md:flex-col md:w-10"
        } justify-between items-center w-16 px-3 py-[6px] bold-13 bg-F2F rounded-lg hover:bg-CFD focus:bg-466 focus:text-white`}
      >
        <FaChevronUp className="upvote-icon w-[10px] text-466" />
        <p>83</p>
      </button>
    </div>
  );
}
