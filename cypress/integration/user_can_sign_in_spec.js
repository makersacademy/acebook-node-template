const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')

describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");
    cy.url().should("include", "/posts");
  });
});
