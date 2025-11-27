import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I have a registered account and fill the correct input", () => {
  cy.visit("http://localhost:5173/#/account");
  cy.get('[data-test="login-form"]').should("exist");
  cy.get('[data-test="login-email-input"]').should("exist").type("Richard");
  cy.get('[data-test="login-password-input"]').should("exist").type("secret");
});

When("I click on the login button", () => {
  cy.get('[data-test="login-submit-input"]').should("exist").click();
});

Then("I successfully log in and return to the home page", () => {
  cy.location("href").should("equal", "http://localhost:5173/#/");
});
