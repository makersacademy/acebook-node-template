describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#confirm_password").type("password");
    cy.get("#username").type("username");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });
});