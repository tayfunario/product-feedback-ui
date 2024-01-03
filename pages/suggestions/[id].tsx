import Link from "next/link";
import Layout from "../../components/Layout";
import Suggestion from "../../components/Suggestion";
import { useState } from "react";
import Comment from "../../components/Comment";
import { AnimatePresence } from "framer-motion";

export default function Detail({ data }) {
  const [totalComments, setTotalComments] = useState<number>(
    data.comments.length + data.replies.length
  );
  console.log(data);
  return (
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
          <button className="button-2">Edit Feedback</button>
        </div>
        <Suggestion {...data.suggestion} />

        <div className="bg-white rounded-lg mt-5 p-5">
          <h2 className="h3-bold">{totalComments} Comments</h2>
          <div className="divide-y-2">
            {data.comments.map((comment) => (
              <Comment
                key={comment.id}
                data={comment}
                replies={data.replies.filter(
                  (reply) => reply.comment_id === comment.id
                )}
              />
            ))}
          </div>
        </div>
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

  return {
    props: {
      data,
    },
  };
}
