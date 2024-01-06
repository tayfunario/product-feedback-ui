import Layout from "../components/Layout";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa";
import { useState } from "react";

export default function Roadmap() {
  const [chosen, setChosen] = useState<string>("planned");
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

      <div className="flex h-14 border-b">
        <button
          className={`w-full bold-13 text-3A4 border-b-4 ${
            chosen === "planned" ? "border-F49" : "border-transparent opacity-40"
          }`}
          onClick={() => setChosen("planned")}
        >
          Planned (2)
        </button>
        <button
          className={`w-full bold-13 text-3A4 border-b-4 ${
            chosen === "in-progress" ? "border-AD1" : "border-transparent opacity-40"
          }`}
          onClick={() => setChosen("in-progress")}
        >
          In-Progress (3)
        </button>
        <button
          className={`w-full bold-13 text-3A4 border-b-4 ${
            chosen === "live" ? "border-62B" : "border-transparent opacity-40"
          }`}
          onClick={() => setChosen("live")}
        >
          Live (1)
        </button>
      </div>
    </Layout>
  );
}
