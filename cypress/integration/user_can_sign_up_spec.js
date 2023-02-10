describe("Registration", () => {
  beforeEach(() => {
    cy.task("clearUsers");
  });

  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("testusernames");
    cy.get("#email").type("testusers@example.com");
    cy.get("#password").type("Makers12345.");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});
