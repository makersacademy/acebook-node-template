describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("password2");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});
