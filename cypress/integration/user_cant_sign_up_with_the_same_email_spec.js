describe("Registration", () => {
  it("A user can't sign up with the same email twice - it gets redirected to the error page", () => {

    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/users");
    cy.contains("This email already exists");
  });
});
