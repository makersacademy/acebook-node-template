describe("Registration", () => {
  it("A user can only sign up once using the same email address", () => {
    // sign up attempt 1
    cy.visit("/users/new");
    cy.get("#email").type("newsomeone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign up attempt 2
    cy.visit("/users/new");
    cy.get("#email").type("newsomeone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/");

  });
});