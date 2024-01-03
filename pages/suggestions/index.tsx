import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { useState } from "react";
import Top from "../../components/Top";
import Suggestion from "../../components/Suggestion";
import Empty from "../../components/Empty";

export default function Index({ data }) {
  const [suggestions, setSuggestions] = useState<SuggestionProps[]>([...data]);
  const [chosenFilter, setChosenFilter] = useState<string>("Most Upvotes");
  const [sort, setSort] = useState<string>("Most Upvotes");

  return (
    <Layout>
      <Header />
      <Top sort={sort} setSort={setSort} />
      <main className="mx-7 pt-6 pb-14">
        {suggestions.length ? (
          suggestions.map((suggestion) => (
            <Suggestion key={suggestion.id} {...suggestion} />
          ))
        ) : (
          <Empty />
        )}
      </main>
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
