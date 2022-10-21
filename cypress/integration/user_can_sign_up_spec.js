describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("exampleFirstName");
    cy.get("#lastName").type("exampleLastName");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });

  it("Shows a signup title", () => {
    // sign up
    cy.visit("/");
    cy.get("#signup").click();

    cy.url().should("include", "/users/new");
  });
  it("Sign up page has a new title", () => {
    // sign up
    cy.visit("/users/new");
    cy.get(".title").should("contain", "Sign up to Acebook");
  });
});
