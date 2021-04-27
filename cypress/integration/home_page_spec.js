describe('Home page', function() {
  it('has a title', function() {
    cy.visit('/');
    cy.get('.title').should('contain', 'Acebook');
  });
});

describe('Registration', function() {
  it('can register a new user', function() {
    cy.visit('/');
    cy.get('form').submit();
    cy.get('.title').should('contain', 'Acebook');
  });
});
