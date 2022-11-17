describe("Registration", () => {
  it("A user signs up, is automatically signed in and redirected to the posts index", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someoneelseagain@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("Testing User");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("A user signs up without an email and is redirected to sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#password").type("password");
    cy.get("#name").type("Testing User");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });

  it("A user signs up without a password and is redirected to sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someoneelseagain@example.com");
    cy.get("#name").type("Testing User");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });

  it("A user signs up without a name and is redirected to sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someoneelseyetagain@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });

  it("A user signs up with an empty form and is redirected to sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });

  it("A user signs up with an email that has been used and is redirected to sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });
});
