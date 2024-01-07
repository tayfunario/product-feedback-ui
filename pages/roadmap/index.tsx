import Layout from "../../components/Layout";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import RoadmapItem from "../../components/RoadmapItem";

export default function Roadmap({ data }) {
  const [chosen, setChosen] = useState<string>("planned");
  const [roadmapItems, setRoadmapItems] = useState<SuggestionProps[]>([]);

  useEffect(() => {
    const filteredData = data.filter(
      (item: SuggestionProps) => item.status === chosen
    );
    setRoadmapItems(filteredData);
  }, [chosen]);

  const planned = data.filter(
    (item: SuggestionProps) => item.status === "planned"
  ).length;
  const inProgress = data.filter(
    (item: SuggestionProps) => item.status === "in-progress"
  ).length;
  const live = data.filter(
    (item: SuggestionProps) => item.status === "live"
  ).length;

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
            chosen === "planned"
              ? "border-F49"
              : "border-transparent opacity-40"
          }`}
          onClick={() => setChosen("planned")}
        >
          Planned ({planned})
        </button>
        <button
          className={`w-full bold-13 text-3A4 border-b-4 ${
            chosen === "in-progress"
              ? "border-AD1"
              : "border-transparent opacity-40"
          }`}
          onClick={() => setChosen("in-progress")}
        >
          In-Progress ({inProgress})
        </button>
        <button
          className={`w-full bold-13 text-3A4 border-b-4 ${
            chosen === "live" ? "border-62B" : "border-transparent opacity-40"
          }`}
          onClick={() => setChosen("live")}
        >
          Live ({live})
        </button>
      </div>

      <div className="mx-7 pt-2 pb-14">
        {chosen === "planned" && (
          <h2 className="h3-bold mt-5 text-3A4">Planned ({planned})</h2>
        )}
        {chosen === "in-progress" && (
          <h2 className="h3-bold mt-5 text-3A4">In-Progress ({inProgress})</h2>
        )}
        {chosen === "live" && (
          <h2 className="h3-bold mt-5 text-3A4">Live ({live})</h2>
        )}

        {chosen === "planned" && (
          <p className="text-647 text-[13px]">Ideas prioritized for research</p>
        )}
        {chosen === "in-progress" && (
          <p className="text-647 text-[13px]">
            Features currently being developed
          </p>
        )}
        {chosen === "live" && (
          <p className="text-647 text-[13px]">Released features</p>
        )}

        {roadmapItems.map((item) => (
          <RoadmapItem
            key={item.id}
            category={item.category}
            description={item.description}
            id={item.id}
            status={item.status}
            title={item.title}
            upvotes={item.upvotes}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/roadmap");
  const data = await res.json();

  return {
    props: { data },
  };
}
