describe('Home page', function() {
  it('has a title', function() {
    cy.visit('/');
    cy.get('.title').should('contain', 'WTfacebook');
  });
  it('has a dashboard with buttons', () => {
    cy.visit('/');
    cy.get('#navbarDropdownMenuLink')
  });
});
