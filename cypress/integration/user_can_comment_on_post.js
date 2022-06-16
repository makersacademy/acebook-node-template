const clearTestDatabase = require('./test_database_helper')

describe("Timeline", () => {

  clearTestDatabase();
  
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/");
    cy.get("#userName").type("Jerry");
    cy.get("#email").type("jerry@example.com");
    cy.get("#password").type("password");
    cy.get('input[type=file]').attachFile("../fixtures/earth.jpg")
    cy.get("#submit-signup").click({force:true});

    // submit a post
    cy.get("#message").type("Hello, world!");
    cy.get(".post-submit-button").click({force:true});

    cy.get(".posts").should("contain", "Hello, world!");


    // add a comment
    cy.get("#add-comment-to-post").find('[data-cy="comments"]').type('Hello back!');
    cy.get("#add-comment-to-post").submit({force:true});

    cy.get("#comments-list").should("contain", 'Hello back!');

    
  });
});