import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import type { BooksType } from "../../lib/type";

function BookDetails() {
  const [book, setBook] = useState<BooksType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const book = await response.json();
        setBook(book);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
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
