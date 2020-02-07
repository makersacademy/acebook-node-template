describe('Home page', function() {
  it('has a title', function() {
    cy.visit('/');
    cy.get('.title').should('contain', 'Acebook');
  });

  it('can visit the sign up page through the link', function() {
    cy.visit('/');
    cy.get('.signup-link').click();
    cy.get('.signup-title').should('contain', 'Sign up to AceBook');
  });
});
