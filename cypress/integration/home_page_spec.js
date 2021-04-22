describe('Home page', function() {
  it('has a title', function() {
    cy.visit('/');
    cy.get('.title').should('contain', 'Acebook');
  });

  it('has a sign up button', function() {
    cy.visit('/');
    cy.contains('Sign up').click();

    cy.url().should('eq', 'http://localhost:3030/users/signup');
  })
});
