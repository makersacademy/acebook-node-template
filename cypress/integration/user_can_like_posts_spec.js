const clearTestDatabase = require('./test_database_helper')

describe("Timeline", () => {

  clearTestDatabase();
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/");
    cy.get("#userName").type("Jerry")
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit-signup").click();

    // submit a post

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get(".post-submit-button").click();

    cy.get(".posts").should("contain", "Hello, world!");

    // like post

    cy.get(".like-button").click();

    cy.get(".likes").should("equal", 1)
  });
});
  