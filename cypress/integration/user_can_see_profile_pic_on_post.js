const clearTestDatabase = require('./test_database_helper')

describe("Timeline", () => {

  clearTestDatabase();
  
  it("can submit posts, when signed in, and view them with profile pic", () => {
    // sign up
    cy.visit("/");
    cy.get("#userName").type("Jerry");
    cy.get("#email").type("jerry@example.com");
    cy.get("#password").type("password");
    cy.get('input[type=file]').attachFile("../fixtures/earth.jpg")
    cy.get("#submit-signup").click();

    // submit a post
    cy.visit("/posts");

    cy.get("#new-post-form").find('[id="message"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!")
    cy.get(".picture-tag").should("be.visible");
   

    // add a comment
    cy.get("#add-comment-to-post").find('[data-cy="comments"]').type('Hello back!');
    cy.get("#add-comment-to-post").submit();

    cy.get("#comments-list").should("contain", 'Hello back!');

    
  });
});