describe('Timeline', function() {
  it('can submit posts and view them', function() {

    cy.visit('/users/login');
    cy.get('#login-form').find('[id="email"]').type('joe@gmail.com');
    cy.get('#login-form').find('[id="password"]').type('password123');
    cy.get('#login-form').submit();

    cy.visit('/users/profile');
    cy.contains('Connect & Search').click();

    cy.get('#search').find('[id="username"]').type('max');
    cy.get('#search').submit();

    cy.get('.list').should('contain', 'max');

  });
});
