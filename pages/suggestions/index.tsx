import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Top from "../../components/Top";
import Suggestion from "../../components/Suggestion";
import Empty from "../../components/Empty";

export default function Index({ data }) {
  const [suggestions, setSuggestions] = useState<SuggestionProps[]>([]);
  const [chosenFilter, setChosenFilter] = useState<string>("Most Upvotes");
  const [chosenSort, setChosenSort] = useState<string>("Most Upvotes");
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <Layout>
      <div className="lg:grid grid-cols-8 gap-x-5 max-w-6xl mx-auto">
        <Header />
        <div className="col-span-6">
          <Top
            numOfSuggestions={suggestions.length}
            sort={chosenSort}
            setSort={setChosenSort}
          />
          <main className="md:mx-0 mx-7 pb-14">
            {suggestions.length ? (
              suggestions.map((suggestion) => (
                <Suggestion
                  key={suggestion.id}
                  {...suggestion}
                  willNavigate={true}
                  width={width}
                />
              ))
            ) : (
              <Empty width={width} />
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/suggestions");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
