describe("Registration", () => {
  it("A user signs up, is automatically signed in and redirected to the posts index", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someoneelseagain@example.com");
    cy.get("#password").type("Password1$");
    cy.get("#name").type("Testing User");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("A user signs up with an email that has been used and is redirected to sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("Password1$");
    cy.get("#name").type("Testing User");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });
});
