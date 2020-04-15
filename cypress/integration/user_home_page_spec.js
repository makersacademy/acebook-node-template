describe('User Home page', function() {
  it('can sign up', function() {
    cy.visit('/');
    cy.get('.title').should('contain', 'Acebook');
  });
});
