describe("Likes", () => {
  it("A user can like a post", () => {
    // delete all table entries
    cy.request("DELETE", "http://localhost:3030/admin/reset", {
      user: "admin",
      password: "password",
    });

    // sign up 
    cy.visit("/users/new");
    cy.get("#first-name").type("some");
    cy.get("#last-name").type("one");
    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");

    // make a new post
    cy.visit("/posts/new");
    cy.get("#message").type("this is a post");
    cy.get("#submit-post").click();

    // see post in feed
    cy.visit("/posts")
    cy.get(".posts").contains("this is a post");
    cy.get(".post-like-counter").contains(0);

    // making PUT request to like a post
    // cy.request("PUT", "/likes/new");
    cy.get(".post-like-button").click();

    // like is registered on post
    cy.get(".post-like-counter").contains(1);
  });
});
