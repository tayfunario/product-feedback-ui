import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Top from "../../components/Top";
import Suggestion from "../../components/Suggestion";
import Empty from "../../components/Empty";

export default function Index({ data }) {
  const [suggestions, setSuggestions] = useState<SuggestionProps[]>([...data]);
  const [chosenCategory, setChosenCategory] = useState<{ value: string }>({
    value: "all",
  });
  const [chosenSort, setChosenSort] = useState<{ value: string }>({
    value: "Most Upvotes",
  });
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    categorizeSuggestions();
  }, [chosenCategory]);

  useEffect(() => {
    sortSuggestions();
  }, [chosenSort]);

  const categorizeSuggestions = () => {
    if (chosenCategory.value === "all") {
      setSuggestions([...data]);
    } else {
      setSuggestions([
        ...data.filter(
          (suggestion) => suggestion.category === chosenCategory.value
        ),
      ]);
    }
  };

  const sortSuggestions = () => {
    if (chosenSort.value === "Most Upvotes") {
      setSuggestions([...suggestions.sort((a, b) => b.upvotes - a.upvotes)]);
    } else if (chosenSort.value === "Least Upvotes") {
      setSuggestions([...suggestions.sort((a, b) => a.upvotes - b.upvotes)]);
    } else if (chosenSort.value === "Most Comments") {
      setSuggestions([
        ...suggestions.sort(
          (a, b) => b.totalCommentReplyNum - a.totalCommentReplyNum
        ),
      ]);
    } else if (chosenSort.value === "Least Comments") {
      setSuggestions([
        ...suggestions.sort(
          (a, b) => a.totalCommentReplyNum - b.totalCommentReplyNum
        ),
      ]);
    }
  };

  return (
    <Layout>
      <div className="lg:grid grid-cols-8 gap-x-5 max-w-6xl mx-auto">
        <Header
          chosenCategory={chosenCategory.value}
          setChosenCategory={setChosenCategory}
        />
        <div className="col-span-6">
          <Top
            numOfSuggestions={suggestions.length}
            sort={chosenSort.value}
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
  const res = await fetch("https://product-feedback-tayfunetta.onrender.com/suggestions");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
