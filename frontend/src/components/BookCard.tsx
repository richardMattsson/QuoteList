import { useState } from "react";
import { BooksType } from "../../lib/type";

type BookCardProps = {
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setBookDetails?: React.Dispatch<React.SetStateAction<BooksType | null>>;
  showResult: boolean;
};

function BookCard({
  id,
  volumeInfo,
  setShowResult,
  setBookDetails,
  showResult,
}: BookCardProps & BooksType) {
  function handleClick() {
    if (setShowResult) {
      setShowResult(false);
    }
    if (setBookDetails) {
      setBookDetails({
        id: id,
        volumeInfo: {
          title: volumeInfo.title,
          authors: [volumeInfo.authors[0]],
          imageLinks: {
            smallThumbnail: volumeInfo.imageLinks.smallThumbnail,
          },
          publishedDate: volumeInfo.publishedDate,
          description: volumeInfo.description,
        },
      });
    }
  }
  return (
    <section
      aria-labelledby="book-heading"
      className={showResult ? "BookCard-container" : "Bookdetail-container"}
    >
      <h2 id="book-heading" className="bookcard-header" onClick={handleClick}>
        {volumeInfo.title}
      </h2>

      <figure className="BookCard-aside">
        {volumeInfo.imageLinks ? (
          <img
            src={volumeInfo.imageLinks.smallThumbnail}
            alt={`bild på ${volumeInfo.title}`}
            className="BookCard-img"
          />
        ) : (
          <div className="BookCard-divNoImage">Ingen bild tillgänglig</div>
        )}
      </figure>

      <section aria-labelledby="book-heading" className="BookCard-main">
        <dl>
          <dt>Författare:</dt>
          {volumeInfo.authors?.map((author, index) => (
            <dd key={index}>{author}</dd>
          ))}

          <dt>Publicerad:</dt>
          <dd>{volumeInfo.publishedDate}</dd>
        </dl>
        {!showResult && (
          <>
            <h4 style={{ marginBottom: 0, fontWeight: "inherit" }}>
              Beskrivning:
            </h4>
            <p>{volumeInfo.description && volumeInfo.description}</p>
            {setShowResult && (
              <button onClick={() => setShowResult(true)}> Tillbaka</button>
            )}
          </>
        )}
      </section>
    </section>
  );
}
export default BookCard;
