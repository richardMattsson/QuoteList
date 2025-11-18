type QuoteType = {
  id: number;
  name: string;
  quote: string;
};

type DisplayQuoteType = {
  quoteDisplay: QuoteType | null;
};

function DisplayQuote({ quoteDisplay }: DisplayQuoteType) {
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
