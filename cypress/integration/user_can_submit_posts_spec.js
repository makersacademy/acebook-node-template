describe("Timeline", () => {
  beforeEach(() => {
    cy.task('clearposts')
  })

  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.signUp();

    // sign in
    cy.signIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find("#message").type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");

    // submit another post and see the most recent post first
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find("#message").type("Hello, again!");
    cy.get("#new-post-form").submit();
    cy.get(".post").first().should("contain", "Hello, again!");
  });

  it("can only like a post once", () => {
    // sign up
    cy.signUp();

    // sign in
    cy.signIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find("#message").type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");

    // should see the post has 0 likes to start with
    cy.get("#like_count").should("contain", 0)

    // should be able to click the like button
    cy.contains("Like").click();

    cy.visit("/posts")

    cy.get("#like_count").should("contain", 1)

    // should not add another after clicking again

    cy.contains("Like").click();

    cy.visit("/posts")

    cy.get("#like_count").should("contain", 1)

  });
});
