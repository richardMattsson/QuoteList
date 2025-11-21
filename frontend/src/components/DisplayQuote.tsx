import { useQuoteContext } from "../context/QuoteContext";

function DisplayQuote() {
  const { quoteDisplay } = useQuoteContext();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ fontStyle: "italic", textAlign: "center" }}>
        {quoteDisplay && `"${quoteDisplay.quote}"`}
      </p>
      <p>{quoteDisplay && quoteDisplay.name}</p>
    </div>
  );
}
export default DisplayQuote;
