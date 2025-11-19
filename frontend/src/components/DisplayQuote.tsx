import { QuoteType } from "../../lib/type";

type DisplayQuoteProps = {
  quoteDisplay: QuoteType | null;
};

function DisplayQuote({ quoteDisplay }: DisplayQuoteProps) {
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
