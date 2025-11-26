describe("Quotes and books", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  // it("fetches quotes from /database.json and displays the firs quote", () => {
  //   cy.intercept(
  //     {
  //       method: "GET",
  //       url: "/database.json",
  //     },
  //     {
  //       body: [
  //         {
  //           id: 1,
  //           name: "Albert Einstein",
  //           quote:
  //             "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  //         },
  //         {
  //           id: 2,
  //           name: "Oscar Wilde",
  //           quote: "Be yourself; everyone else is already taken.",
  //         },
  //         {
  //           id: 3,
  //           name: "William Shakespeare",
  //           quote: "To be or not to be, that is the question.",
  //         },
  //       ],
  //     }
  //   ).as("quotes");

  //   cy.wait("@quotes");

  //   cy.get('[data-test="test-quote"]').should(
  //     "contain.text",
  //     "Albert Einstein"
  //   );
  // });

  it("searches for a book and shows results", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=Harry Potter",
      },
      {
        body: {
          id: "qzcQCwAAQBAJ",
          volumeInfo: {
            title: "Harry Potter och De Vises Sten",
            authors: ["J.K. Rowling"],
            imageLinks: {
              smallThumbnail:
                "http://books.google.com/books/content?id=qzcQCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            },
            publishedDate: "2015-12-08",
            description:
              "Plötsligt händer det märkliga ting i den lilla staden! Mystiska stjärnskott på himlen och svärmar av ugglor mitt på dagen, katter som läser kartor och underliga människor som står i gathörnen och viskar. De viskar om en viss Harry Potter ... Föräldralöse Harry Potter bor hos sina elaka styvföräldrar och deras vidrige son. En helt ny värld öppnar sig för Harry när det visar sig att han egentligen är en trollkarl och börjar Hogwarths Skola för Häxkonster och Trolldom, en värld full av magi och spännande äventyr!",
            previewLink:
              "http://books.google.se/books?id=qzcQCwAAQBAJ&printsec=frontcover&dq=Harry+Potter&hl=&cd=1&source=gbs_api",
          },
        },
      }
    ).as("bookSearch");

    cy.get("@bookSearch");

    cy.get('[data-test="test-bookArticle"]').should("be.empty");
    cy.get('[data-test="test-booksearch"]').type("Harry Potter");
    cy.get('[data-test="test-submitbutton"]').click();
    cy.get('[data-test="test-bookArticle"]').should("not.be.empty");
  });
});
