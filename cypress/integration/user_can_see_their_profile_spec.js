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
    cy.get("#submit-signup").click({force:true});

    // visits profile
    cy.visit("/users/profile");

    cy.get('h2').should("contain", "Jerry");
  });
});