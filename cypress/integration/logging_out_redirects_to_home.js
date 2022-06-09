const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')


describe("Authentication", () => {
  it("A user signs up and in, signs out and is redirected to home", () => {
    signUp("username", "password", "email@email.com");
    signIn("username", "password");

    cy.get("#log-out").click();
    cy.url().should("eq", "http://localhost:3030/");

  });
});
