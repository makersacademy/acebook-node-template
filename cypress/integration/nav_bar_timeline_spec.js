const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')

describe("Navbar timeline button", () => {
  it("navigates to the timeline", () => {

    signUp("someone@example.com", "password", "username");
    signIn("someone@example.com", "password");
    cy.get("#timeline").click();
    cy.url().should("eq", "http://localhost:3030/posts");
  });
});
