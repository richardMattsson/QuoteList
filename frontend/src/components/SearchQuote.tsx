import { useEffect, useState } from "react";

import type { QuoteType } from "../../lib/type";

type SearchQuoteProps = {
  quotes: QuoteType[] | null;
  setSearchResults: React.Dispatch<React.SetStateAction<QuoteType[] | null>>;
};

function SearchQuote({ quotes, setSearchResults }: SearchQuoteProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!text.length) {
      setSearchResults([]);
      return;
    }
    if (quotes) {
      const filteredArray = quotes.filter((quote) =>
        quote.name.toLowerCase().match(text.toLowerCase())
      );
      setSearchResults(filteredArray!);
    }
  }, [text]);

  return (
    <>
      <label htmlFor="searchQuote">Sök citat</label>
      <input
        name="searchQuote"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
}
export default SearchQuote;
