describe('Home page', function() {

  beforeEach(() => {
    cy.visit('http://localhost:3030')
  });

  it('has a title', function() {
    cy.visit('/');
    cy.get('.title').should('contain', 'Acebook');
  });
});
