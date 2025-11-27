import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I fill the incorrect information in the input fields", () => {
  cy.visit("http://localhost:5173/#/account");
  cy.get('[data-test="login-form"]').should("exist");
  cy.get('[data-test="login-email-input"]').should("exist").type("Adam");
  cy.get('[data-test="login-password-input"]').should("exist").type("123");
});

When("I click on the login button", () => {
  cy.get('[data-test="login-submit-input"]').should("exist").click();
});

Then("I dont get logged in and being given a error message", () => {
  cy.get('[data-test="login-error-message"]');
});
