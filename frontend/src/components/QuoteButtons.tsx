import { QuoteType } from "../../lib/type";

type QuoteButtonsProps = {
  quotes: QuoteType[] | null;
  setQuote: (quote: QuoteType) => void;
  quoteDisplay: QuoteType | null;
};

function QuoteButtons({ quotes, quoteDisplay, setQuote }: QuoteButtonsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid white",
      }}
    >
      {quotes &&
        quotes.map((quote) => (
          <button
            key={quote.id}
            className="button"
            style={{
              border: "1px solid grey",
              borderRadius: "5px",
              textAlign: "center",
              margin: "10px",
              padding: "0 10px",
              cursor: "pointer",
            }}
            onClick={() => setQuote(quote)}
            disabled={
              quoteDisplay && quoteDisplay.id === quote.id ? true : false
            }
          >
            <p>{quote.name}</p>
          </button>
        ))}
    </div>
  );
}
export default QuoteButtons;
