describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Cypress");
    cy.get("#lastName").type("Test");
    cy.get("#email").type("tester@example.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});
