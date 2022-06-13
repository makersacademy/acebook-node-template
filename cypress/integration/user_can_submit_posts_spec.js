const clearTestDatabase = require('./test_database_helper')

describe("Timeline", () => {

  clearTestDatabase();

  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/");
    cy.get("#userName").type("Jerry")
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit-signup").click(); //signs user in

    // submit a post
    cy.get("#message").type("Hello, world!");
    cy.get(".post-submit-button").click();

    cy.get(".posts").should("contain", "Hello, world!");


     
  });
});
