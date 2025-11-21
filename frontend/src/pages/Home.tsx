import { useState, useEffect } from "react";

import QuoteButtons from "../components/QuoteButtons";
import QuoteSection from "../components/QuoteSection";
import Books from "../components/Books";

import type { QuoteType } from "../../lib/type";
import { useQuoteContext } from "../context/QuoteContext";

function Home() {
  const [quotes, setQuotes] = useState<QuoteType[] | null>(null);
  const { setQuoteDisplay } = useQuoteContext();

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
      <div style={{ display: "flex", marginBottom: "2rem" }}>
        <QuoteButtons quotes={quotes} />
        <QuoteSection quotes={quotes} setQuotes={setQuotes} />
      </div>
      <Books />
    </>
  );
}

export default Home;
