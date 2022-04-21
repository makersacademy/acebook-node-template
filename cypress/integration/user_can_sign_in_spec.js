const webHelper = require('../support/web_helpers.js');

describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    webHelper.signUp();

    cy.url().should("include", "/posts");
    cy.contains("Message");
  });
});
