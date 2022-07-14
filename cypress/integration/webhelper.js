const signUpAndSignIn = () => {
  // sign up
  cy.visit("/users/new");
  cy.get("#name").type("TestUser");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();

  // sign in
  cy.visit("/sessions/new");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
}

module.exports = signUpAndSignIn