describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Homer");
    cy.get("#lastName").type("Simpson");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
});
