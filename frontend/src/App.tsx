import { useState, useEffect } from "react";

import "./App.css";
import QuoteButtons from "./components/QuoteButtons";
import QuoteSection from "./components/QuoteSection";

import { QuoteType } from "../lib/type";

function App() {
  const [quotes, setQuotes] = useState<QuoteType[] | null>(null);
  const [quoteDisplay, setQuoteDisplay] = useState<QuoteType | null>(null);

  useEffect(() => {
    fetch("/api/quotes")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setQuotes(result);
        setQuoteDisplay(result[0]);
      });
  }, []);

  const setQuote = (quote: QuoteType) => {
    setQuoteDisplay(quote);
  };

  return (
    <>
      <div style={{ display: "flex", marginBottom: "2rem" }}>
        <QuoteButtons
          quotes={quotes}
          setQuote={setQuote}
          quoteDisplay={quoteDisplay}
        />
        <QuoteSection
          quotes={quotes}
          setQuotes={setQuotes}
          setQuoteDisplay={setQuoteDisplay}
          quoteDisplay={quoteDisplay}
        />
      </div>
    </>
  );
}

export default App;
