import { useNavigate } from "react-router-dom";
import type { BooksType } from "../../lib/type";

type BookCardProps = {
  showDetails?: boolean;
  setShowDetails?: React.Dispatch<React.SetStateAction<boolean>>;
};

function BookCard({
  id,
  volumeInfo,
  showDetails,
  setShowDetails,
}: BookCardProps & BooksType) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/bookDetails/${id}`);

    if (setShowDetails) {
      setShowDetails(true);
    }
  }

  return (
    <section
      aria-labelledby="book-heading"
      className={showDetails ? "Bookdetail-container" : "BookCard-container"}
    >
      <h2
        data-test={`test-bookTitle-${id}`}
        id="book-heading"
        className="bookcard-header"
        onClick={handleClick}
      >
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
        {showDetails && (
          <>
            <h4 style={{ marginBottom: 0, fontWeight: "inherit" }}>
              Beskrivning:
            </h4>
            <p>
              {volumeInfo.description &&
                volumeInfo.description.replace(/[^a-öA-Ö0-9.,?!\s]/g, " ")}
            </p>
            <a href={volumeInfo.previewLink} target="_blank">
              {volumeInfo.previewLink}
            </a>
          </>
        )}
      </section>
    </section>
  );
}
export default BookCard;
