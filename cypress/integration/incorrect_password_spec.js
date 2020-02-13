describe('Signup', function() {
  it('Tells user if their password is wrong when logging in', function() {
    cy.visit('/users/login');
    cy.get('#login-form').find('[id="email"]').type('joe@gmail.com');
    cy.get('#login-form').find('[id="password"]').type('wrong');
    cy.get('#login-form').submit();

    cy.get('.title').should('contain', 'You have an Error');
  });
});
