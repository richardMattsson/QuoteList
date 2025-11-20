import { createContext, useContext, useState } from "react";
import type { BooksType } from "../../lib/type";

type BookContextType = {
  books: BooksType[] | null;
  setBooks: React.Dispatch<React.SetStateAction<BooksType[] | null>>;
};

type BookContextProviderProps = {
  children: React.ReactNode;
};

const BookContext = createContext<BookContextType | null>(null);

function BookContextProvider({ children }: BookContextProviderProps) {
  const [books, setBooks] = useState<BooksType[] | null>(null);

  const value = {
    books,
    setBooks,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBookContext() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("This should not be use outside BookContextProvider");
  }
  return context;
}

export default BookContextProvider;
