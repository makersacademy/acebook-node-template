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

  it("User tries to submit without an email address", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#password").type("Password1$");
    cy.get("#name").type("Testing User");
    cy.get('#submit').should('be.disabled')
  });

  it("User tries to submit without a user name", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("Password1$");
    cy.get('#submit').should('be.disabled')
  });

  it("User tries to submit with a short password", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#name").type("Testing User");
    cy.get("#password").type("Prd1$");
    cy.get('#submit').should('be.disabled')
  });

  it("User tries to submit with a password without number", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#name").type("Testing User");
    cy.get("#password").type("Password$");
    cy.get('#submit').should('be.disabled')
  });

  it("User tries to submit with a password without special charecter", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#name").type("Testing User");
    cy.get("#password").type("Password1");
    cy.get('#submit').should('be.disabled')
  });

  it("User tries to submit with a password without capital letter", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#name").type("Testing User");
    cy.get("#password").type("password1");
    cy.get('#submit').should('be.disabled')
  });
});