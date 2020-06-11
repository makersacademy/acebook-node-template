describe('Log Out', function() {
  it('can log the user out', function() {
    cy.task('emptyUsers');
    cy.task('insertUser', {firstName: 'Lomothy', lastName: 'Mockins', email: 'Lomothy.Tomins@example.com', password: '12345'});
    cy.visit('/');
    cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#login-form').find('[id="password"]').type('12345')
    cy.get('#login-form').submit();
    
    cy.get('#log-out').click();
    cy.get('#login-message').should('contain', 'You logged out.');
  });
});