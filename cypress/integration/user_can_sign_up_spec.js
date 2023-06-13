describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("password!234");
    cy.get("#confirm-password").type("password!234");
    cy.get("#first-name").type("Mrtest")
    cy.get("#last-name").type("Testtest")
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});
