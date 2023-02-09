describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.task("wipe_database");
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });

  it("A user cannot sign up with blank credentials", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#submit").click();
    cy.url().should("include", "/users/new");
  });

  it("A user cannot sign up with valid email and blank password", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();
    cy.url().should("include", "/users/new");
  });

  it("A user cannot sign up with a valid password and blank email", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/users/new");
  });

  it("A user cannot sign up with a password and an incomplete/invalid email", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.url().should("include", "/users/new");
  });

  //
  // it("A user cannot sign up with a valid email and an invalid password", () => {
  //   // sign up
  //   cy.visit("/users/new");
  //   cy.get("#email").type("someone@example.com");
  //   cy.get("#password").type("pass");
  //   cy.get("#submit").click();
  //   cy.url().should("include", "/users/new");
  // });
});
