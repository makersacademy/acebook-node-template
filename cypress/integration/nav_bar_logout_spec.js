const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')

describe("Navbar log-out button", () => {
  it("log-out logs out  a signed in user and navigates to new session page", () => {
    signUp("someone@example.com", "password", "username");
    signIn("someone@example.com", "password");
    cy.url().should("include", "/posts")
    cy.get("#log-out").click();
    cy.url().should("eq", "http://localhost:3030/");
  });
});
