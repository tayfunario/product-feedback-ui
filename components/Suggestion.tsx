import Link from "next/link";
import Comments from "./Comments";
import Upvote from "./Upvote";

export default function Suggestion({
  category,
  description,
  id,
  status,
  title,
  upvotes,
  totalCommentReplyNum,
  willNavigate,
  width,
}: SuggestionProps) {
  if (willNavigate) {
    return width < 768 ? (
      <Link
        href={`/suggestions/${id}`}
        className="sugg-item block bg-white rounded-lg mt-5 p-5"
      >
        <div>
          <h2 className="bold-13 text-3A4 capitalize">{title}</h2>
          <p className="text-[13px] text-647 my-3">{description}</p>
          <div
            className={`sugg-type ${
              category === "ux" || category === "ui"
                ? "uppercase"
                : "capitalize"
            }`}
          >
            {category}
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <Upvote upvoteNum={upvotes} />
          <Comments numOfComments={totalCommentReplyNum} />
        </div>
      </Link>
    ) : (
      <Link
        href={`/suggestions/${id}`}
        className="sugg-item grid grid-cols-10 bg-white rounded-lg mt-5 px-5 py-7"
      >
        <Upvote upvoteNum={upvotes} />

        <div className="col-span-8">
          <h2 className="h3-bold text-3A4 mb-1 capitalize">{title}</h2>
          <p className="text-[16px] text-647 mb-4">{description}</p>
          <div
            className={`sugg-type ${
              category === "ux" || category === "ui"
                ? "uppercase"
                : "capitalize"
            }`}
          >
            {category}
          </div>
        </div>

        <Comments numOfComments={totalCommentReplyNum} />
      </Link>
    );
  } else {
    return width < 768 ? (
      <div className="sugg-item block bg-white rounded-lg mt-5 p-5">
        <div>
          <h2 className="bold-13 text-3A4 capitalize">{title}</h2>
          <p className="text-[13px] text-647 my-3">{description}</p>
          <div
            className={`sugg-type ${
              category === "ux" || category === "ui"
                ? "uppercase"
                : "capitalize"
            }`}
          >
            {category}
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <Upvote upvoteNum={upvotes} />
          <Comments numOfComments={totalCommentReplyNum} />
        </div>
      </div>
    ) : (
      <div className="sugg-item grid grid-cols-10 bg-white rounded-lg mt-5 px-5 py-7">
        <Upvote upvoteNum={upvotes} />

        <div className="col-span-8">
          <h2 className="h3-bold text-3A4 mb-1 capitalize">{title}</h2>
          <p className="text-[16px] text-647 mb-4">{description}</p>
          <div
            className={`sugg-type ${
              category === "ux" || category === "ui"
                ? "uppercase"
                : "capitalize"
            }`}
          >
            {category}
          </div>
        </div>

        <Comments numOfComments={totalCommentReplyNum} />
      </div>
    );
  }
}
