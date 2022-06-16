const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')

describe("Navbar home button", () => {
  it("navigates to the home page", () => {

    signUp("someone@example.com", "password", "username");
    signIn("someone@example.com", "password");
    cy.url().should("include", "/posts")
    cy.get("#home").click();
    cy.url().should("eq", "http://localhost:3030/");
  });
});
