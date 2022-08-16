describe("Sign out", () => {
  it("can sign out from account once signed in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign out
    cy.visit("/posts");
    cy.contains("Timeline");

    cy.get("#Logout").find('[value="Logout"]');
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
    cy.contains("Don't have an account? Sign Up");
  });
});