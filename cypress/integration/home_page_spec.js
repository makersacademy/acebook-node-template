describe('Home page', function() {
  it('has a title', function() {
    cy.visit('/');
    cy.get('.title').should('contain', 'Acebook');
  });
  it('has a sign up button', function() {
    cy.visit('/');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/users/new');
  });
});
