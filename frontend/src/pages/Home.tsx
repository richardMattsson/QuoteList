import { useState, useEffect } from "react";

import QuoteButtons from "../components/QuoteButtons";
import QuoteSection from "../components/QuoteSection";
import Books from "../components/Books";

import type { QuoteType } from "../../lib/type";
import { useQuoteContext } from "../context/QuoteContext";
import SearchQuote from "../components/SearchQuote";

function Home() {
  const [quotes, setQuotes] = useState<QuoteType[] | null>(null);
  const { setQuoteDisplay } = useQuoteContext();
  const [searchResults, setSearchResults] = useState<QuoteType[] | null>(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch("/database.json");
        const quotes: QuoteType[] | null = await response.json();
        setQuoteDisplay(quotes ? quotes[0] : null);
        setQuotes(quotes);
      } catch (error) {
        console.log(error);
      }
    }
    fetchQuotes();
  }, []);
  return (
    <>
      <SearchQuote quotes={quotes} setSearchResults={setSearchResults} />
      <div style={{ display: "flex", marginBottom: "2rem" }}>
        <QuoteButtons quotes={searchResults} />
        <QuoteSection quotes={quotes} setQuotes={setQuotes} />
      </div>
      <Books />
    </>
  );
}

export default Home;
