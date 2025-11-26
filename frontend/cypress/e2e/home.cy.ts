describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("shows a heading with the correct text", () => {
    cy.get("[data-test='home-heading']").contains("Quotes and books");
  });

  it("shows quotebutton and quote with correct text", () => {
    cy.get('[data-test="test-quotebuttons"]')
      .children()
      .eq(0)
      .contains("Albert Einstein");
  });

  it("click on a quote button to show that quote", () => {
    cy.get('[data-test="test-quotebuttons"]').children().eq(1).click();
    cy.get('[data-test="test-quote"]').contains("Oscar Wilde");
  });

  it.only("filter quotes on name", () => {
    cy.get('[data-test="test-searchinput"]').type("William Shakespeare");
    cy.get('[data-test="test-quotebuttons"]').children().eq(0).click();
    cy.get('[data-test="test-quote"]').contains("William Shakespeare");
    cy.get('[data-test="test-searchinput"]').clear();
  });
});
