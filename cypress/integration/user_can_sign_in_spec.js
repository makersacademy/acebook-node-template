const webHelper = require('../support/web_helpers.js');

describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    webHelper.signUp();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
