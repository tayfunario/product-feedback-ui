import { useState } from "react";

export default function Reply({
  comment_id,
  content,
  nick_name,
  replying_to,
  user_image,
  user_name,
}: ReplyProps) {
  const [openComment, setOpenComment] = useState<boolean>(false);
  return (
    <div className="pt-3 border-l pl-5">
      <div className="flex items-center">
        <img
          src={`/user-images/${user_image}`}
          alt="avatar-ali"
          className="w-11 h-11 rounded-full"
        />
        <div className="ml-4">
          <h3 className="bold-13 text-3A4">{user_name}</h3>
          <p className="text-[13px] text-647">@{nick_name}</p>
        </div>
        <button
          className="ml-auto text-466 body-3"
          onClick={() => setOpenComment(true)}
        >
          Reply
        </button>
      </div>

      <p className="text-647 mt-5 text-[13px]">
        <span className="bold-13 text-AD1">@{replying_to} </span>
        {content}
      </p>
      {openComment && (
        <div className="text-end">
          <input
            type="textarea"
            className="w-full mt-5 px-3 py-2 text-[13px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
            placeholder="Reply..."
          />
          <button className="button-1 mt-3">Post Reply</button>
        </div>
      )}
    </div>
  );
}
