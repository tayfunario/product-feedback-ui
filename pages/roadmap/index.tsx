import Layout from "../../components/Layout";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import RoadmapItem from "../../components/RoadmapItem";

export default function Roadmap({ data }) {
  const [chosen, setChosen] = useState<string>("planned");
  const [roadmapItems, setRoadmapItems] = useState<SuggestionProps[]>(data);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, []);

  useEffect(() => {
    const filteredData = data.filter(
      (item: SuggestionProps) => item.status === chosen
    );
    setRoadmapItems(filteredData);
  }, [chosen]);

  const plannedCount = data.filter(
    (item: SuggestionProps) => item.status === "planned"
  ).length;
  const inProgressCount = data.filter(
    (item: SuggestionProps) => item.status === "in-progress"
  ).length;
  const liveCount = data.filter(
    (item: SuggestionProps) => item.status === "live"
  ).length;

  return width < 768 ? (
    <Layout>
      <header className="flex justify-between items-center p-5 bg-373">
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
        <Link
          href="/new"
          className="button-1 flex justify-center items-center my-2"
        >
          <TiPlus className="mr-1" />
          Add Feedback
        </Link>
      </header>

      <nav className="flex h-14 border-b">
        <button
          className={`w-full bold-13 text-3A4 border-b-4 ${
            chosen === "planned"
              ? "border-F49"
              : "border-transparent opacity-40"
          }`}
          onClick={() => setChosen("planned")}
        >
          Planned ({plannedCount})
        </button>
        <button
          className={`w-full bold-13 text-3A4 border-b-4 ${
            chosen === "in-progress"
              ? "border-AD1"
              : "border-transparent opacity-40"
          }`}
          onClick={() => setChosen("in-progress")}
        >
          In-Progress ({inProgressCount})
        </button>
        <button
          className={`w-full bold-13 text-3A4 border-b-4 ${
            chosen === "live" ? "border-62B" : "border-transparent opacity-40"
          }`}
          onClick={() => setChosen("live")}
        >
          Live ({liveCount})
        </button>
      </nav>

      <main className="mx-7 pt-2 pb-14">
        {chosen === "planned" && (
          <>
            <h2 className="h3-bold mt-5 text-3A4">Planned ({plannedCount})</h2>
            <p className="text-647 text-[13px]">
              Ideas prioritized for research
            </p>
          </>
        )}
        {chosen === "in-progress" && (
          <>
            <h2 className="h3-bold mt-5 text-3A4">
              In-Progress ({inProgressCount})
            </h2>
            <p className="text-647 text-[13px]">
              Features currently being developed
            </p>
          </>
        )}
        {chosen === "live" && (
          <>
            <h2 className="h3-bold mt-5 text-3A4">Live ({liveCount})</h2>
            <p className="text-647 text-[13px]">Released features</p>
          </>
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
            totalCommentReplyNum={item.totalCommentReplyNum}
            willNavigate={true}
            width={width}
          />
        ))}
      </main>
    </Layout>
  ) : (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center p-5 mb-3 bg-373 rounded-lg">
          <div className="text-white">
            <Link
              href="/suggestions"
              className="flex justify-start items-center gap-x-2 w-18 bold-13"
            >
              <FaChevronLeft className="text-[#CDD2EE]" />
              Go back
            </Link>
            <h2 className="h1-bold">Roadmap</h2>
          </div>
          <Link
            href="/new"
            className="button-1 flex justify-center items-center my-2"
          >
            <TiPlus className="mr-1" />
            Add Feedback
          </Link>
        </header>

        <main className="grid grid-cols-3 gap-x-4">
          <article>
            <h2 className="lg:text-lg text-sm font-bold mt-5 text-3A4">
              Planned ({plannedCount})
            </h2>
            <p className="text-647 lg:text-base text-sm">
              Ideas prioritized for research
            </p>

            {/* don't use roadmapItems as it's filtered for mobile layout.
            you can't display all the roadmap items which is necessary for desktop layout */}
            {data
              .filter((elem: SuggestionProps) => elem.status === "planned")
              .sort((a, b) => b.upvotes - a.upvotes)
              .map((item) => (
                <RoadmapItem
                  key={item.id}
                  category={item.category}
                  description={item.description}
                  id={item.id}
                  status={item.status}
                  title={item.title}
                  upvotes={item.upvotes}
                  totalCommentReplyNum={item.totalCommentReplyNum}
                  willNavigate={true}
                  width={width}
                />
              ))}
          </article>

          <article>
            <h2 className="lg:text-lg text-sm font-bold mt-5 text-3A4">
              In-Progress ({inProgressCount})
            </h2>
            <p className="text-647 lg:text-base text-sm">
              Features currently being developed
            </p>

            {/* don't use roadmapItems as it's filtered for mobile layout.
            you can't display all the roadmap items which is necessary for desktop layout */}
            {data
              .filter((elem: SuggestionProps) => elem.status === "in-progress")
              .sort((a, b) => b.upvotes + a.upvotes)
              .map((item) => (
                <RoadmapItem
                  key={item.id}
                  category={item.category}
                  description={item.description}
                  id={item.id}
                  status={item.status}
                  title={item.title}
                  upvotes={item.upvotes}
                  totalCommentReplyNum={item.totalCommentReplyNum}
                  willNavigate={true}
                  width={width}
                />
              ))}
          </article>

          <article>
            <h2 className="lg:text-lg text-sm font-bold mt-5 text-3A4">
              Live ({liveCount})
            </h2>
            <p className="text-647 lg:text-base text-sm">Released features</p>

            {/* don't use roadmapItems as it's filtered for mobile layout.
            you can't display all the roadmap items which is necessary for desktop layout */}
            {data
              .filter((elem: SuggestionProps) => elem.status === "live")
              .map((item) => (
                <RoadmapItem
                  key={item.id}
                  category={item.category}
                  description={item.description}
                  id={item.id}
                  status={item.status}
                  title={item.title}
                  upvotes={item.upvotes}
                  totalCommentReplyNum={item.totalCommentReplyNum}
                  willNavigate={true}
                  width={width}
                />
              ))}
          </article>
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://product-feedback-tayfunetta.onrender.com/roadmap"
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
