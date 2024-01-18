import { useState, useRef, useEffect } from "react";
import Reply from "./Reply";
import { useRouter } from "next/router";

export default function Comment({
  data: { content, id, nick_name, request_id, user_image, user_name },
  replies,
  width,
}: {
  data: CommentProps;
  replies: ReplyProps[];
  width: number;
}) {
  const [openComment, setOpenComment] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const checkInput = () => {
    let isInputEmpty = false;

    if (inputRef.current!.value === "") {
      isInputEmpty = true;
      inputRef.current!.classList.add("border-red-500");
      inputRef.current!.classList.remove("border-transparent");
      inputRef.current!.nextElementSibling!.classList.remove("invisible");
    }

    if (!isInputEmpty) {
      sendReplyToServer(inputRef.current!.value);
      router.reload();
    }
  };

  const checkTextarea = () => {
    let isTextareaEmpty = false;

    if (textAreaRef.current!.value === "") {
      isTextareaEmpty = true;
      textAreaRef.current!.classList.add("border-red-500");
      textAreaRef.current!.classList.remove("border-transparent");
      textAreaRef.current!.nextElementSibling!.classList.remove("invisible");
    }

    if (!isTextareaEmpty) {
      sendReplyToServer(textAreaRef.current!.value);
    }
  };

  const sendReplyToServer = async (content: string) => {
    const res = await fetch(`https://product-feedback-tayfunetta.onrender.com/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        replyingTo: nick_name,
        user_image: "image-guest.webp",
        user_name: "Guest",
        nick_name: "guest01",
        comment_id: id,
      }),
    });
    router.reload();
  };

  const resetInputStyle = (elem: HTMLElement) => {
    elem.classList.remove("border-red-500");
    elem.nextElementSibling!.classList.add("invisible");
  };

  return (
    <article className="py-7">
      <div className="flex items-center">
        <img
          src={`/user-images/${user_image}`}
          alt="avatar-ali"
          className="w-11 h-11 rounded-full"
        />
        <div className="ml-4">
          <h3 className="bold-13 text-3A4">{user_name}</h3>
          <p className="md:text-[14px] text-[13px] text-647">@{nick_name}</p>
        </div>
        <button
          className="ml-auto text-466 body-3"
          onClick={() => setOpenComment(true)}
        >
          Reply
        </button>
      </div>

      <p className="text-647 mt-5 md:text-[15px] text-[13px]">{content}</p>

      {width < 768
        ? openComment && (
            <div className="text-end">
              <input
                ref={inputRef}
                type="textarea"
                className="w-full mt-5 px-3 py-2 text-[13px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
                placeholder="Type your comment here"
                onChange={() => resetInputStyle(inputRef.current!)}
              />
              <p className="invisible md:text-xs text-[10px] text-[#D73737]">
                Can't be empty
              </p>
              <button className="button-1 mt-1" onClick={() => checkInput()}>
                Post Reply
              </button>
            </div>
          )
        : openComment && (
            <div className="flex justify-between items-start gap-x-4 text-end mt-5">
              <div className="grow">
                <textarea
                  ref={textAreaRef}
                  className="w-full px-3 py-2 md:text-[15px] text-[13px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
                  placeholder="Type your comment here"
                  rows={2}
                  onChange={() => resetInputStyle(textAreaRef.current!)}
                />
                <p className="invisible md:text-xs text-[10px] mt-[-7px] text-[#D73737]">
                  Can't be empty
                </p>
              </div>

              <button className="button-1" onClick={() => checkTextarea()}>
                Post Reply
              </button>
            </div>
          )}

      <div className={replies.length ? "mt-5" : ""}>
        {replies.map((reply, index) => (
          <Reply key={index} {...reply} width={width} />
        ))}
      </div>
    </article>
  );
}
