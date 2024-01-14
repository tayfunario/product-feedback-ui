import Link from "next/link";
import Comments from "./Comments";
import Upvote from "./Upvote";
import { GoDotFill } from "react-icons/go";

export default function RoadmapItem({
  category,
  description,
  id,
  status,
  title,
  upvotes,
  willNavigate,
  totalCommentReplyNum,
  width,
}: SuggestionProps) {
  function setCorrespondingColor() {
    if (status === "planned") return "bg-F49";
    if (status === "live") return "bg-62B";
    return "bg-AD1";
  }

  function setCorrespondingColorText() {
    if (status === "planned") return "text-F49";
    if (status === "live") return "text-62B";
    return "text-AD1";
  }

  function convertStatusToText() {
    if (status === "planned") return "Planned";
    if (status === "live") return "Live";
    return "In Progress";
  }

  return (
    <Link
      href={`/roadmap/${id}`}
      className="sugg-item relative block bg-white rounded-lg mt-5 p-5 overflow-hidden"
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 ${setCorrespondingColor()}`}
      />

      <div className="flex items-center">
        <GoDotFill
          className={`inline size-4 mr-1 my-2 ${setCorrespondingColorText()}`}
        />
        <p className="lg:text-base text-[13px] text-647">
          {convertStatusToText()}
        </p>
      </div>

      <div className="order-first col-span-8">
        <h2 className="lg:text-lg text-[13px] text-3A4 font-bold">
          {title}
        </h2>
        <p className="lg:text-base text-[13px] text-647 my-3">
          {description}
        </p>
        <div className="sugg-type">{category}</div>
      </div>

      <div className="flex justify-between mt-5">
        <Upvote upvoteNum={upvotes} isHorizontal={true} />
        <Comments numOfComments={totalCommentReplyNum} />
      </div>
    </Link>
  );
}
