import { FaChevronUp } from "react-icons/fa";

export default function Upvote() {
  return (
    <div className="flex justify-center items-start pr-3">
      <button className="upvote-btn flex md:flex-col justify-between items-center md:w-10 w-16 px-3 py-[6px] bold-13 bg-F2F rounded-lg hover:bg-CFD focus:bg-466 focus:text-white">
        <FaChevronUp className="upvote-icon w-[10px] text-466" />
        <p>83</p>
      </button>
    </div>
  );
}
