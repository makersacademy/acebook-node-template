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
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();

    //like the post
    cy.contains("0 likes");
    cy.get(".like").click();
    cy.contains("1 likes")
  });

  it("click like twice (from one user) should first like, then unlike the post", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();

    //like and unlike the post
    cy.get(".like").click();
    cy.get(".like").click();
    cy.contains("0 likes");
  });

  it("get two likes from two users", () => {
    // create 1st user
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();

    // like the post and log out
    cy.get(".like").click();
    cy.get("#logout").click();

    // create 2nd user
    cy.visit("/users/new");
    cy.get("#email").type("anotherone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("anotherone");
    cy.get("#submit").click();

    // second user likes the post
    cy.get(".like").click();
    cy.contains("2 likes")
  });
})
