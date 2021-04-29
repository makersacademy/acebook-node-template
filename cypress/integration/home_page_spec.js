describe('Home page', function() {
  it('has a title', function() {
    cy.visit('/');
    cy.get('h1').should('contain', 'Acebook');
  });

  it('has a sign up button', function() {
    cy.visit('/');
    cy.get('#signup').click();

    cy.url().should('eq', 'http://localhost:3030/users/signup');
  })
});
