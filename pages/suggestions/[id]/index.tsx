import Link from "next/link";
import Layout from "../../../components/Layout";
import Suggestion from "../../../components/Suggestion";
import { useState, useEffect } from "react";
import Comment from "../../../components/Comment";

export default function Detail({ data }) {
  const [totalComments, setTotalComments] = useState<number>(
    data.comments.length
  );
  const [newComment, setNewComment] = useState<string>("");
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

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
            className="w-full mt-5 px-3 py-2 text-[13px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
            placeholder="Type your comment here"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            maxLength={250}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-[13px] text-647">
              {250 - newComment.length} Characters left
            </span>
            <button className="button-1">Post Comment</button>
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
            className="w-full mt-5 px-3 py-2 text-[15px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
            placeholder="Type your comment here"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            maxLength={250}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-[15px] text-647">
              {250 - newComment.length} Characters left
            </span>
            <button className="button-1">Post Comment</button>
          </div>
        </footer>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/suggestions");
  const data = await res.json();

  const paths = data.map((suggestion) => ({
    params: { id: suggestion.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
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
