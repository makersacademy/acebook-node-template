describe("Commenting on posts", () => {
  beforeEach(() => {
    cy.task('clearposts')
  })

  it("should have a comment button which leads to comment page", () => {
    // sign up
    cy.signUp()

    // sign in
    cy.signIn()

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find("#message").type("Hello, world!");
    cy.get("#new-post-form").submit();

    //this post should have a comment button
    cy.get(".post").should("contain", "Hello, world!");

    cy.get(".post").contains("#add-comment-button", "Comment")
  });

  it("Submitting a comment should add the comment to the post", () => {
    // sign up
    cy.signUp()

    // sign in
    cy.signIn()

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find("#message").type("Hello, world!");
    cy.get("#new-post-form").submit();

    // submit a comment
    cy.get("#comment-field").type("Goodbye, world!");
    cy.get("#add-comment-button").click();

    cy.visit('/posts')

    cy.get(".post").get(".comment").contains("Goodbye, world!")
  });
});