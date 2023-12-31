import { TiPlus } from "react-icons/ti";

export default function Empty() {
  return (
    <div className="flex justify-center items-center flex-col h-[28rem] bg-white rounded-lg mt-5 p-5">
      <img src="/illustration-empty.svg" alt="empty" />
      <h1 className="h3-bold mt-10 text-3A4">There is no feedback yet.</h1>
      <p className="text-[13px] text-center text-647 mt-5 mb-3">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <button className="button-1 flex justify-center items-center my-2">
        <TiPlus className="mr-1" />
        Add Feedback
      </button>
    </div>
  );
}
