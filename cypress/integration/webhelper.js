const signUpAndSignIn = () => {
  // sign up
  cy.visit("/users/new");

  cy.get("#firstName").type("Test");
  cy.get("#lastName").type("User");

  cy.get("#username").type("CypressTestUser");

  cy.get("#birthday").type("1999-06-11");
  cy.get("#location").type("Cypress");

  cy.get("#email").type("test@cypress.com");
  cy.get("#password").type("password");

  cy.get("#submit").click();

  // sign in
  cy.visit("/sessions/new");
  cy.get("#email").type("test@cypress.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
}

module.exports = signUpAndSignIn