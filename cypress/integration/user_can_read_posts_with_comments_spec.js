describe('Newsfeed', function() {
  it('can view all posts with comments', function() {
    cy.visit('/signup');
    cy.get('#new-user-form').find('[id="firstName"]').type('Lomothy')
    cy.get('#new-user-form').find('[id="lastName"]').type('Tomins')
    cy.get('#new-user-form').find('[id="email"]').type('lt@example.com')
    cy.get('#new-user-form').find('[id="password"]').type('1234')
    cy.get('#new-user-form').submit();

    cy.get('#login-form').find('[id="email"]').type('lt@example.com')
    cy.get('#login-form').find('[id="password"]').type('1234');
    cy.get('#login-form').submit();

    cy.get('#posts').should('contain', 'Amazing!');
    // cy.get('#comment-form').find('[id="comment"]').type("a");

  });
});
