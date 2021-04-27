describe('Home page', function() {
  it('has a title', function() {
    cy.visit('/');
    cy.get('.logo').should('contain', 'Acebook');
  });
});

describe('Registration', function() {
  it('can register a new user', function() {
    cy.visit('/');
    cy.get('input.fname').type('Bob')
    cy.get('input#pword').type('Bob')
    cy.get('.registration-form').submit();
    cy.contains('User Posts')
  });
});
