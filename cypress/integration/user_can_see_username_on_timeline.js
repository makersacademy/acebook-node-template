const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')

describe("Authentication", () => {
  it("A user signs in and can see their username in /posts", () => {

    signUp("someone@gmail.com", "password", "Jane Doe");
    signIn("someone@gmail.com", "password");
    
    cy.contains("h1", "Jane Doe's Timeline");
  });
});
