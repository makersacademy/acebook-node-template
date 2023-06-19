describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Homer");
    cy.get("#lastName").type("Simpson");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});
