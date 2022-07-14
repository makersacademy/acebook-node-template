describe("Timeline", () => {
  it("Can delete the mosts recent post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("I like zuckerberg");
    cy.get("#new-post-form").submit();
;
    // Delete Button
    // cy.get("#delete-list-button").submit();
    
    
    // cy.get('ul').children('.active')
    cy.get('.formPost').contains('I like zuckerberg').click();
    cy.get('.post').contains('I like zuckerberg').should('not.exist')


    // cy.contains("I love zuckerberg").should('not.exist')
  });
});