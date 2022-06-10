const signUp = require('../support/signup_helper')

describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    signUp("email@email.com", "password", "username");
    cy.url().should("include", "/sessions/new");
  });
});
