const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')


describe("Authentication", () => {
  it("A user signs up and in, signs out and is redirected to home", () => {
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");

    cy.get("#log-out").click();
    cy.url().should("eq", "http://localhost:3030/");
  });
});
