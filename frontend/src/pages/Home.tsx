import { useState, useEffect } from "react";

import QuoteButtons from "../components/QuoteButtons";
import QuoteSection from "../components/QuoteSection";

import { QuoteType } from "../../lib/type";
import Books from "../components/Books";

function Home() {
  const [quotes, setQuotes] = useState<QuoteType[] | null>(null);
  const [quoteDisplay, setQuoteDisplay] = useState<QuoteType | null>(null);

  useEffect(() => {
    fetch("/database.json")
      .then((response) => response.json())
      .then((result: QuoteType[]) => {
        setQuotes(result);
        setQuoteDisplay(result[0]);
      });
  }, []);
  return (
    <>
      <div style={{ display: "flex", marginBottom: "2rem" }}>
        <QuoteButtons
          quotes={quotes}
          setQuoteDisplay={setQuoteDisplay}
          quoteDisplay={quoteDisplay}
        />
        <QuoteSection
          quotes={quotes}
          setQuotes={setQuotes}
          setQuoteDisplay={setQuoteDisplay}
          quoteDisplay={quoteDisplay}
        />
      </div>
      <Books />
    </>
  );
}

export default Home;
