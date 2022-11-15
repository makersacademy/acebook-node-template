describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someoneelse@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });

  it("A user signs up without an email and is redirected to sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });

  it("A user signs up without a password and is redirected to sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someoneelseagain@example.com");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });

  it("A user signs up without a password or email and is redirected to sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });

  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/users/new");
  });
});
