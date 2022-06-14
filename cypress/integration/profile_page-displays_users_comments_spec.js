const clearTestDatabase = require('./test_database_helper');

describe("Profile", () => {

  clearTestDatabase();

  it("Dispalys posts written by the user", () => {
    // sign up Jerry
    cy.visit("/");
    cy.get("#userName").type("Jerry");
    cy.get("#email").type("jerry@example.com");
    cy.get("#password").type("password");
    cy.get('input[type=file]').attachFile("../fixtures/earth.jpg")
    cy.get("#submit-signup").click();

    cy.get("#message").type("Hello, world!");
    cy.get(".post-submit-button").click();

    // log out
    cy.get("#logout").click({force: true});

    // sign up Terry
    cy.visit("/");
    cy.get("#userName").type("Terry");
    cy.get("#email").type("terry@example.com");
    cy.get("#password").type("password");
    cy.get('input[type=file]').attachFile("../fixtures/earth.jpg")
    cy.get("#submit-signup").click();

    cy.get("#message").type("Terro, world!");
    cy.get(".post-submit-button").click();

    // visit profile page
    cy.visit("/users/profile");

    // page should only show posts from Terry
    cy.get('[data-cy="user-posts"]').should("contain", "Terro, world!");
    cy.get('[data-cy="user-posts"]').should("not.have.value", "Hello, world!");
  });

});