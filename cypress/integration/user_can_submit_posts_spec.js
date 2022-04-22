const webHelper = require("../support/web_helpers.js");

describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    webHelper.signUp();

    // submit a post

    cy.get("#message").type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
    cy.get(".posts").should("contain", "a few seconds ago");
  });
});
