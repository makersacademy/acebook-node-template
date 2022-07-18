var mongoose = require("mongoose");

describe("Timeline", () => {
  it("can like a post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();


    // like a post
    cy.visit("/posts");

    cy.get("#like-comment").submit();

    cy.get(".posts").should("contain", "Likes: 1");

    // delete like from a post
    cy.visit("/posts");

    cy.get("#remove-like-comment").submit();

    cy.get(".posts").should("not.contain", "Likes: 1");
  });
});