import { useState } from "react";
import BookCard from "./BookCard";
import { BooksType } from "../../lib/type";

function Books() {
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState<BooksType[] | null>(null);
  const [showResult, setShowResult] = useState<boolean>(true);
  const [bookDetails, setBookDetails] = useState<BooksType | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowResult(true);

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

      <article className={showResult ? "Home-article" : "hideElement"}>
        {books &&
          books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              volumeInfo={book.volumeInfo}
              setShowResult={setShowResult}
              setBookDetails={setBookDetails}
              showResult={showResult}
            />
          ))}
      </article>
      {bookDetails && (
        <BookCard
          id={bookDetails.id}
          volumeInfo={bookDetails.volumeInfo}
          showResult={showResult}
          setShowResult={setShowResult}
        />
      )}
    </>
  );
}
export default Books;
