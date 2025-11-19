import { useState } from "react";
import { BooksType } from "../../lib/type";

function BookCard({ id, volumeInfo }: BooksType) {
  function handleClick() {}
  return (
    <section aria-labelledby="book-heading" className="BookCard-container">
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
          {/* <dt>Publicerad:</dt>
          <dd>{book.volumeInfo.publishedDate}</dd>
          <dt>Kategori:</dt>
          <dd>
            {book.volumeInfo.categories
              ? book.volumeInfo.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))
              : '-'}
          </dd> */}
        </dl>

        {/* <h4 style={{ marginBottom: 0, fontWeight: 'inherit' }}>Beskrivning:</h4>
        {book.volumeInfo.description ? (
          <p>{book.volumeInfo.description.slice(0, 150)}...</p>
        ) : (
          <p>Ingen beskrivning tillgänglig.</p>
        )}
        <div>
          <button
            onClick={
              favorite
                ? () => removeFromFavorites(book.id)
                : () => addToFavorites(book)
            }
          >
            {favorite ? '❤️' : '🤍'}
          </button>
          <button onClick={() => navigate(`/details/${book.id}`)}>
            Läs mer
          </button>
        </div> */}
      </section>
    </section>
  );
}
export default BookCard;
