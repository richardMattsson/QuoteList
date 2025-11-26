import type { QuoteType } from "../../lib/type";
import { useQuoteContext } from "../context/QuoteContext";

type QuoteButtonsProps = {
  quotes: QuoteType[] | null;
};

function QuoteButtons({ quotes }: QuoteButtonsProps) {
  const { quoteDisplay, setQuoteDisplay } = useQuoteContext();
  return (
    <div
      data-test="test-quotebuttons"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {quotes &&
        quotes.map((quote) => (
          <button
            data-test={`test-quotebutton-${quote.id}`}
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
            onClick={() => setQuoteDisplay(quote)}
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
