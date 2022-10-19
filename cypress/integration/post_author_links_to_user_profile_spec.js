describe("Author Links", () => {
  it("can access user profile through link in post author", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");

    cy.contains("Make a post").click();
    cy.visit("/posts/new");
    cy.get("#message").type("Cypress test post!");
    cy.get("#submit").click();

    // assert author link
    cy.get(".post:first")
      .find(".post-author:first")
      .within(() => {
        cy.get("a").click();
      });

    // redirects to profile
    cy.get("#username").should("contain", "someone");
  });
});
