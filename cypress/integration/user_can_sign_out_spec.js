describe("Authentication", () => {
  it("A user can Sign out After Signing in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("TestUser");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");

    // Sign back Out
    cy.contains("Sign Out").click();
    cy.url().should("include", "/");
  });

});
