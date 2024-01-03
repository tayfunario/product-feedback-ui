import Layout from "../../components/Layout";
import Link from "next/link";

export default function New() {
  return (
    <Layout>
      <div className="mx-7 pt-8 pb-14">
        <Link
          href="/suggestions"
          className="flex justify-between items-center w-16 text-647 bold-13"
        >
          <img src="/icon-arrow-left.svg" alt="arrow-left" />
          Go back
        </Link>

        <div className="relative bg-white rounded-lg mt-16 px-5 pt1 pb-5">
          <img
            src="/icon-new-feedback.svg"
            alt="new-feedback"
            className="relative bottom-5 w-10"
          />
          <h2 className="h3-bold text-3A4 pb-5">Create New Feedback</h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="bold-13 text-3A4">Feedback Title</legend>
              <p className="text-[13px] text-647">
                Add a short, descriptive headline
              </p>
              <input
                type="text"
                className="w-full mt-2 p-3 text-[13px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
              />
            </fieldset>

            <fieldset className="mt-6">
              <legend className="bold-13 text-3A4">Category</legend>
              <p className="text-[13px] text-647">
                Choose a category for your feedback
              </p>
              <input
                type="text"
                className="w-full mt-2 p-3 text-[13px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
              />
            </fieldset>

            <fieldset className="mt-6">
              <legend className="bold-13 text-3A4">Feedback Detail</legend>
              <p className="text-[13px] text-647">
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea
                className="w-full mt-2 px-3 py-2 text-[13px] bg-F7F text-3A4 rounded-lg border border-transparent focus:border-466 focus:outline-none"
                rows={3}
                maxLength={250}
              />
            </fieldset>
            <button className="button-1 w-full mt-6">Add Feedback</button>
            <button className="button-3 w-full mt-3">Cancel</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
