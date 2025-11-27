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
        setQuotes(quotes);
        setQuoteDisplay(quotes ? quotes[0] : null);
      } catch (error) {
        console.log(error);
      }
    }
    fetchQuotes();
  }, []);
  return (
    <>
      <div
        style={{ display: "flex", marginBottom: "2rem", minHeight: "450px" }}
      >
        <section
          style={{
            display: "grid",
            gap: 5,
            alignItems: "start",
            padding: "2rem",
            borderRight: "1px solid white",
            borderBottom: "1px solid white",
          }}
        >
          <SearchQuote quotes={quotes} setSearchResults={setSearchResults} />
          <QuoteButtons
            quotes={
              searchResults && searchResults.length > 0 ? searchResults : quotes
            }
          />
        </section>
        <QuoteSection quotes={quotes} setQuotes={setQuotes} />
      </div>
      <Books />
    </>
  );
}

export default Home;
