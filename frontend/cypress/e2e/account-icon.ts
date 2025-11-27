import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("The homesceen shows a account-icon", () => {
  cy.visit("http://localhost:5173");
});

When("I click on the account-icon", () => {
  cy.get('[data-test="account-icon"]').click();
});

Then("I go to the account page", () => {
  cy.location("href").should("equal", "http://localhost:5173/#/account");
});
