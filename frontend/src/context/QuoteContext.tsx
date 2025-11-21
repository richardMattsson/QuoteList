import { createContext, useContext, useState } from "react";

import type { QuoteType } from "../../lib/type";

type QuoteContextType = {
  quoteDisplay: QuoteType | null;
  setQuoteDisplay: React.Dispatch<React.SetStateAction<QuoteType | null>>;
};

const QuoteContext = createContext<QuoteContextType | null>(null);

type QuoteContextProviderProps = {
  children: React.ReactNode;
};

function QuouteContextProvider({ children }: QuoteContextProviderProps) {
  const [quoteDisplay, setQuoteDisplay] = useState<QuoteType | null>(null);
  const value = {
    quoteDisplay,
    setQuoteDisplay,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
}

export function useQuoteContext() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error(
      "This element must be used inside the QuoteContextProvider"
    );
  }
  return context;
}

export default QuouteContextProvider;
