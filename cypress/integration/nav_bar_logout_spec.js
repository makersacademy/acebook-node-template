const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')

describe("Navbar log-out button", () => {
  it("logs out a signed in user and navigates to new session page", () => {
    signUp("someone@example.com", "password", "username");
    signIn("someone@example.com", "password");
    cy.get('#log-out-form').find('[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3030/");
  });
});
