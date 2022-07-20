const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("like counter displays on post and clicking button increments it", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("I want people to like this post.");
    cy.get("#new-post-form").submit();

    // like the post
    cy.visit("/posts");
    cy.get(".like-post").first().submit();

    cy.visit("/posts");
    cy.get(".likes").should("contain", "Likes: 1");
  });

  it("like counter doesn't show when no likes have been added to post", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("I don't want people to like this post.");
    cy.get("#new-post-form").submit();


    cy.visit("/posts");
    cy.get(".post").should("not.contain", "Likes:");
  });

  it("links the user that liked the post to the like", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("I want people to like this post.");
    cy.get("#new-post-form").submit();

    // like the post
    cy.visit("/posts");
    cy.get(".like-post").first().submit();

    // click on the likes
    cy.visit("/posts");
    cy.get(".likes").click();

    // should show username of post liker
    cy.get(".liked-by").should("contain", "CypressTestUser");
  })
});
