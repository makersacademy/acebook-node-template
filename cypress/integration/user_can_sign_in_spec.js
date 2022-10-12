describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
