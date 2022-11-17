describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someoneelse@example.com");
    cy.get("#password").type("Password1$");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
