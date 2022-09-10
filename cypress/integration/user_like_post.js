describe("Timeline", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("like a post - requires sign in and making a post to like", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Whats on your mind?");

    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();
    cy.get(".posts").should("contain", "Hello, world!");

    //like the post
    cy.contains("Likes: 0");
    cy.get(".like").click();
    cy.contains("Likes: 1")
  });

});
