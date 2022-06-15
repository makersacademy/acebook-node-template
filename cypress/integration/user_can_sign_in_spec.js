const clearTestDatabase = require('./test_database_helper')

describe("Authentication", () => {
  clearTestDatabase();
  it("A user signs in after signing up and is redirected to /posts", () => {
    // sign up
    cy.visit("/");
    cy.get("#userName").type("Jerry");
    cy.get("#email").type("jerry@example.com");
    cy.get("#password").type("password");
    cy.get('input[type=file]').attachFile("../fixtures/earth.jpg")
    cy.get("#submit-signup").click({force:true});

    cy.url().should("include", "/posts");
    cy.contains("h1", "Timeline");
  });

  it("A user with an account logs in and is redirected to /posts", () => {
    //sign up
    cy.visit("/");
    cy.get("#userName").type("Jerry");
    cy.get("#email").type("jerry@example.com");
    cy.get("#password").type("password");
    cy.get('input[type=file]').attachFile("../fixtures/earth.jpg")
    cy.get("#submit-signup").click({force: true});

    //log out
    cy.get("#logout").click({force: true});

    //log in
    cy.visit("/sessions/new")
    cy.get("#email").type("jerry@example.com");
    cy.get("#password").type("password");
    cy.get("#submit-signin").click({force: true});

    cy.url().should("include", "/posts");
    cy.contains("h1", "Timeline");
  })
});
