const webHelper = require("../support/web_helpers.js");

describe("likes", () => {
  it("can like a post", () => {
    webHelper.signUp();
    webHelper.submitPost();

    // Like post
    cy.get(".likeUnlike:nth(0)").click();
    cy.visit("/posts");
    cy.get(".likeUnlike:nth(0)").should("have.value", "Unlike");

    // Unlike a post

    cy.get(".likeUnlike:nth(0)").click();
    cy.visit("/posts");
    cy.get(".likeUnlike:nth(0)").should("have.value", "Like");
  });
});
