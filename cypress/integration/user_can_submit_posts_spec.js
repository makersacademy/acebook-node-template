const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("can submit posts, when signed in, and view them", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Test", "User");

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find("#message")
      .type("Test message: cypress submit post test!");
    cy.get("#new-post-form").submit();

    // assert that the post should contain the content, username, and timestamp
    cy.get(".posts").should(
      "contain",
      "Test message: cypress submit post test!"
    );
    cy.get(".posts").should("contain", "TestUser");
    cy.get(".posts").should("contain", "2022");
  });
});
