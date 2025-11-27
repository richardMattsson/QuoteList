describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  context("first display", () => {
    it("shows a heading with the correct text", () => {
      cy.get("[data-test='home-heading']").contains("Quotes & Books");
    });

    it("fetches quotes from /database.json and displays the first quote", () => {
      cy.intercept("/database.json", {
        body: [
          {
            id: 1,
            name: "Albert Einstein",
            quote:
              "Life is like riding a bicycle. To keep your balance, you must keep moving.",
          },
          {
            id: 2,
            name: "Oscar Wilde",
            quote: "Be yourself; everyone else is already taken.",
          },
          {
            id: 3,
            name: "William Shakespeare",
            quote: "To be or not to be, that is the question.",
          },
        ],
      }).as("quotes");

      cy.wait("@quotes");

      cy.get('[data-test="test-quotebuttons"]')
        .children()
        .eq(0)
        .contains("Albert Einstein");

      cy.get('[data-test="test-quote"]').contains("Albert Einstein");
    });
  });

  context("interact with quotes", () => {
    it("click on a quote button to show that quote", () => {
      cy.get('[data-test="test-quotebuttons"]').children().eq(1).click();
      cy.get('[data-test="test-quote"]').contains("Oscar Wilde");
    });

    it("filter quotes on name", () => {
      cy.get('[data-test="test-searchinput"]').type("osc");
      cy.get('[data-test="test-quotebuttons"]')
        .children()
        .eq(0)
        .contains("osc", { matchCase: false });
    });
  });

  context("add and update quotes", () => {
    it("add a quote using the form", () => {
      cy.get('[data-test="input-button-add"]').click();
      cy.get('[data-test="input-name"]').eq(0).type("Wayne Gretzky");
      cy.get('[data-test="textarea-quote"]')
        .eq(0)
        .type("Yo miss 100% of all the shots you dont take.");
      cy.get('[data-test="submit-quote-form"]').eq(0).click();
    });

    it("update a quote using the form", () => {
      cy.get('[data-test="input-button-update"]').click();
      cy.get('[data-test="input-name"]').eq(1).type("Albert Einstein");
      cy.get('[data-test="textarea-quote"]')
        .eq(1)
        .type("Imagination is more important than knowledge.");
      cy.get('[data-test="submit-quote-form"]').eq(1).click();
    });

    it("delete a quote using the form", () => {
      cy.get('[data-test="test-quotebuttons"]')
        .children()
        .eq(0)
        .contains("Albert Einstein");
      cy.get('[data-test="input-button-delete"]').click();
      cy.get('[data-test="test-quotebuttons"]')
        .children()
        .eq(0)
        .should("not.have.text", "Albert Einstein");
    });
  });

  context("book search", () => {
    it("search for a book and navigate to correct adress", () => {
      cy.intercept("https://www.googleapis.com/books/v1/volumes?q=*", {
        body: {
          items: [
            {
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
          ],
        },
      }).as("bookSearch");

      cy.get('[data-test="test-submitbutton"]').click();
      cy.wait("@bookSearch");
      cy.get('[data-test="test-bookTitle-qzcQCwAAQBAJ"]').click();

      cy.location("href").should(
        "equal",
        "http://localhost:5173/#/bookDetails/qzcQCwAAQBAJ"
      );
      cy.get("[data-test='home-heading']").click();
      cy.location("href").should("equal", "http://localhost:5173/#/");
    });
  });
});
