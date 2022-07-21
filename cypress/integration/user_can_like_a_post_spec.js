const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("like counter displays on post and clicking button increments it", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Test", "User");

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find("#message")
      .type("I want people to like this post.");
    cy.get("#new-post-form").submit();

    // like the post
    cy.visit("/posts");
    cy.get(".like-post").first().submit();

    // assert that the post is showing it has received a like
    cy.visit("/posts");
    cy.get(".likes").should("contain", "Likes: 1");
  });

  it("like counter doesn't show when no likes have been added to post", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Test", "User");

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("I don't want people to like this post.");
    cy.get("#new-post-form").submit();

    // assert that the like counter is not visible if no likes have been received
    cy.visit("/posts");
    cy.get(".post").should("not.contain", "Likes:");
  });
});
