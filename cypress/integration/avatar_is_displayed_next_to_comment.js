const path = require("path");

describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone9@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone9@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Make a post").click();
    cy.visit("/posts/new");

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#submit").click();

    //submit a comment
    cy.get(".comment-input:first").type("A comment");
    cy.get(".submit-comment:first").click();

    // new comment is displayed with the author information and its avatar
    cy.readFile(
      path.join(__dirname, "..", "..", "public", "images", "testImage.png"),
      "base64"
    ).then((image) => {
      const src = `data:image/png;base64,${image}`;
      cy.get(".post:first")
        .find(".comment:first")
        .within(() => {
          cy.get(".author-comment-image").should("have.attr", "src", src);
        });
    });
  });
});
