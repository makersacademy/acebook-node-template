describe('User Home page', function() {
  it('can sign up page', function() {
    cy.visit('/');
    cy.get('.title').should('contain', 'C');
  });
});
