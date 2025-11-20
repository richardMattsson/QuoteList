import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import type { BooksType } from "../../lib/type";

function BookDetails() {
  const [book, setBook] = useState<BooksType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setBook(result);
      });
  }, [id]);

  return (
    <>
      {book && (
        <BookCard
          id={book.id}
          volumeInfo={book.volumeInfo}
          showDetails={true}
        />
      )}
    </>
  );
}
export default BookDetails;
