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

    cy.get("#new-post-form").find('[type="text"]').type("I sadfasdf zuckerberg");
    cy.get("#new-post-form").submit();
;
    // Delete Button
    // cy.get("#delete-list-button").submit();
    
    
    // cy.get('ul').children('.active')
    cy.get('input[name="I sadfasdf zuckerberg"]').click();
    cy.get('.post').contains('I sadfasdf zuckerberg').should('not.exist')


    // cy.contains("I love zuckerberg").should('not.exist')
  });
});