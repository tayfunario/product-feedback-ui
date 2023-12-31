import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { useState } from "react";
import Top from "../../components/Top";
import Suggestion from "../../components/Suggestion";
import Empty from "../../components/Empty";

export default function Index() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [chosenFilter, setChosenFilter] = useState<string>("Most Upvotes");
  const [sort, setSort] = useState<string>("Most Upvotes");

  return (
    <Layout>
      <Header />
      <Top sort={sort} setSort={setSort} />
      <div className="mx-7 pt-6 pb-14">
        {suggestions.length ? (
          suggestions.map((suggestion) => <Suggestion key={suggestion} />)
        ) : (
          <Empty />
        )}
      </div>
    </Layout>
  );
}
