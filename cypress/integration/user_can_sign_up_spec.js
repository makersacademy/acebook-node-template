describe("Registration", () => {
  afterEach(() => {
    cy.task("dropUsers");
  });

  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("CypressTestUser");
    cy.get("#email").type("test@cypress.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});
