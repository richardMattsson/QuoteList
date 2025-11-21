import { useState } from "react";
import BookCard from "./BookCard";
import { useBookContext } from "../context/BookContext";

function Books() {
  const [inputValue, setInputValue] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const { books, setBooks } = useBookContext();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}`)
      .then((response) => response.json())
      .then((result) => {
        setBooks(result.items);
      });
  }
  return (
    <>
      <section className="Home-header" aria-labelledby="search-heading">
        <h1 id="search-heading" className="Home-h1">
          Sök efter en bok
        </h1>
        <form onSubmit={handleSubmit} className="Home-form">
          <input
            style={{ fontSize: "20px" }}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="Home-input"
          />

          <button type="submit" style={{ width: "100px" }}>
            Sök
          </button>
        </form>
      </section>

      <article className={"Home-article"}>
        {books &&
          books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              volumeInfo={book.volumeInfo}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
          ))}
      </article>
    </>
  );
}
export default Books;
