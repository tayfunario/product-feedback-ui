import Layout from "../components/Layout";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa";

export default function Roadmap() {
  return (
    <Layout>
      <div className="flex justify-between items-center p-5 bg-373">
        <div className="text-white">
          <Link
            href="/suggestions"
            className="flex justify-between items-center w-18 bold-13"
          >
            <FaChevronLeft className="text-[#CDD2EE]" />
            Go back
          </Link>
          <h2 className="h3-bold">Roadmap</h2>
        </div>
        <button className="button-1 flex justify-center items-center my-2">
          <TiPlus className="mr-1" />
          Add Feedback
        </button>
      </div>
    </Layout>
  );
}
