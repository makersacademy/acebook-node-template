describe("Timeline", () => {

  // IGNORE ALL TESTS FOR NOW - USE FUTURE FIXED TESTS

  it("can submit posts, when signed in, and view them", () => {
    
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone5@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    
    // submit a post
    cy.visit("/posts");
    
    cy.contains("Make a post").click(); 
    cy.visit("/posts/new");
    cy.get("#message").type("Cypress test post!");
    cy.get("#submit").click();

    cy.get('div').should('have.class', 'post')
  });
});
