const signUpAndSignIn = require("./webhelper");

describe("Delete Post", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("A user can delete a post when they're signed in", () => {
    signUpAndSignIn("Test", "User");

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Delete this post!");
    cy.get("#new-post-form").submit();
    cy.get(".posts").should("contain", "Delete this post!");

    // delete a post
    cy.visit("/posts");
    cy.get(".delete-post").first().submit();

    // assert that the page no longer shows the post
    cy.visit("/posts");
    cy.get(".posts").should("not.contain", "Delete this post!");
  });
});
