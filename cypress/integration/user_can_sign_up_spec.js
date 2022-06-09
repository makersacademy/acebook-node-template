const signUp = require('../support/signup_helper')

describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    signUp("username", "password", "email@email.com");
    cy.url().should("include", "/sessions/new");
  });
});
