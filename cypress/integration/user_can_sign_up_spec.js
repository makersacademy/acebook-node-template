const signUp = require('../support/signup_helper')

describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    signUp();
    cy.url().should("include", "/sessions/new");
  });
});
