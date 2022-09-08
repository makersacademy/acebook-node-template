describe("Registration", () => {
  it("A user signs up and is redirected to sign up", () => {
    // Go to sign up page
    cy.visit("/");
    cy.contains("Sign up here").click();

    // sign up
    cy.visit("/users/new");
    cy.get("#first-name").type("some");
    cy.get("#last-name").type("one");
    cy.get("#username").type("someone123");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    cy.url().should("include", "/");
  });
});
