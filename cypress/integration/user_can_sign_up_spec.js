describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // Go to sign up page
    cy.visit("/");
    cy.get("#new-user").click();
    cy.url().should("include", "/users/new");
    cy.contains("Sign up").click();

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
