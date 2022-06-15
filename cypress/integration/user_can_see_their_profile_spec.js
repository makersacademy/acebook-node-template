const clearTestDatabase = require('./test_database_helper');

describe("Profile", () => {

  clearTestDatabase();
  it("displays the logged in user's name on the page", () => {
    // sign up
    cy.visit("/");
    cy.get("#userName").type("Jerry");
    cy.get("#email").type("jerry@example.com");
    cy.get("#password").type("password");
    cy.get('input[type=file]').attachFile("../fixtures/earth.jpg")
    cy.get("#submit-signup").click();

    // visits profile
    cy.visit("/users/profile");

    cy.get('[data-cy="greeting"]').should("contain", "Jerry");
  });
});