import Link from "next/link";
import Layout from "../../../components/Layout";
import Suggestion from "../../../components/Suggestion";
import { useState, useEffect, useRef } from "react";
import Comment from "../../../components/Comment";
import { useRouter } from "next/router";

export default function Detail({ data }) {
  const [totalComments, setTotalComments] = useState<number>(
    data.comments.length + data.replies.length
  );
  const [newComment, setNewComment] = useState<string>("");
  const [width, setWidth] = useState<number>(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const checkCommentInput = () => {
    let isInputValid = true;
    if (textAreaRef.current!.value === "") {
      isInputValid = false;
      textAreaRef.current!.classList.add("border-red-500");
      textAreaRef.current!.classList.remove("border-transparent");
      textAreaRef.current!.nextElementSibling!.classList.remove("invisible");
    }

    if (isInputValid) {
      sendCommentToServer();
      setNewComment("");
    }
  };

  const resetTextAreaStyle = () => {
    textAreaRef.current!.classList.remove("border-red-500");
    textAreaRef.current!.nextElementSibling!.classList.add("invisible");
  };

  const sendCommentToServer = async () => {
    const res = await fetch(`http://localhost:4000/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newComment,
        user_image: "image-guest.webp",
        user_name: "Guest",
        nick_name: "guest01",
        request_id: data.suggestion.id,
      }),
    });
    router.reload();
  };

  return width < 768 ? (
    <Layout>
      <div className="mx-7 pt-6 pb-14">
        <div className="flex justify-between items-center">
          <Link
            href="/suggestions"
            className="flex justify-between items-center w-16 text-647 bold-13"
          >
            <img src="/icon-arrow-left.svg" alt="arrow-left" />
            Go back
          </Link>
          <Link
            href={`/suggestions/${data.suggestion.id}/edit`}
            className="button-2"
          >
            Edit Feedback
          </Link>
        </div>
        <Suggestion
          {...data.suggestion}
          totalCommentReplyNum={data.comments.length + data.replies.length}
          width={width}
        />

        {data.comments.length > 0 && (
          <div className="bg-white rounded-lg mt-5 p-5">
            <h2 className="h3-bold">{totalComments} Comments</h2>
            <div className="divide-y-2">
              {data.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  data={comment}
                  width={width}
                  replies={data.replies.filter(
                    (reply) => reply.comment_id === comment.id
                  )}
                />
              ))}
            </div>
          </div>
        )}

        <footer className="bg-white rounded-lg mt-5 p-5">
          <h2 className="h3-bold">Add Comment</h2>
          <textarea
            ref={textAreaRef}
            className="w-full mt-5 px-3 py-2 text-[13px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
            placeholder="Type your comment here"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              resetTextAreaStyle();
            }}
            rows={3}
            maxLength={250}
          />
          <p className="invisible md:text-xs text-[10px] mt-[-7px] text-[#D73737]">
            Can't be empty
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-[13px] text-647">
              {250 - newComment.length} Characters left
            </span>
            <button className="button-1" onClick={() => checkCommentInput()}>
              Post Comment
            </button>
          </div>
        </footer>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className="2xl:max-w-3xl max-w-2xl mx-auto pt-6 pb-14">
        <div className="flex justify-between items-center">
          <Link
            href="/suggestions"
            className="flex justify-between items-center w-[72px] text-647 bold-13"
          >
            <img src="/icon-arrow-left.svg" alt="arrow-left" />
            Go back
          </Link>
          <Link
            href={`/suggestions/${data.suggestion.id}/edit`}
            className="button-2"
          >
            Edit Feedback
          </Link>
        </div>

        <Suggestion
          {...data.suggestion}
          totalCommentReplyNum={data.comments.length + data.replies.length}
          width={width}
        />

        {data.comments.length > 0 && (
          <div className="bg-white rounded-lg mt-5 p-5">
            <h2 className="h3-bold">{totalComments} Comments</h2>
            <div className="divide-y-2">
              {data.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  data={comment}
                  width={width}
                  replies={data.replies.filter(
                    (reply) => reply.comment_id === comment.id
                  )}
                />
              ))}
            </div>
          </div>
        )}

        <footer className="bg-white rounded-lg mt-5 p-5">
          <h2 className="h3-bold">Add Comment</h2>
          <textarea
            ref={textAreaRef}
            className="w-full mt-5 px-3 py-2 text-[15px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
            placeholder="Type your comment here"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              resetTextAreaStyle();
            }}
            rows={3}
            maxLength={250}
          />
          <p className="invisible md:text-xs text-[10px] mt-[-7px] text-[#D73737]">
            Can't be empty
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-[15px] text-647">
              {250 - newComment.length} Characters left
            </span>
            <button className="button-1" onClick={() => checkCommentInput()}>
              Post Comment
            </button>
          </div>
        </footer>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(
//     "https://product-feedback-tayfunetta.onrender.com/suggestions"
//   );
//   const data = await res.json();

//   const paths = data.map((suggestion) => ({
//     params: { id: suggestion.id.toString() },
//   }));

//   return { paths, fallback: "blocking" };
// }

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:4000/suggestions/${params.id}`);
  const data = await res.json();

  if (!data.suggestion) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}
