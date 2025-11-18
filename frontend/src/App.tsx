import { useState, useEffect } from "react";

import "./App.css";
import QuoteButtons from "./components/QuoteButtons";
import QuoteSection from "./components/QuoteSection";

type QuoteType = {
  id: number;
  name: string;
  quote: string;
};

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
          setQuotes={setQuotes}
          setQuoteDisplay={setQuoteDisplay}
          quoteDisplay={quoteDisplay}
          quotes={quotes}
        />
      </div>
    </>
  );
}

export default App;
