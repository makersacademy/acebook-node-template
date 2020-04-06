describe('Has a dashboard', () => {
  it('has a dropdown menu', () => {
    cy.visit('/');
    cy.get('#navbarDropdownMenuLink')
  });

  it('has a dropdown menu within posts with content', () => {
    cy.visit('/posts');
    cy.get('#navbarDropdownMenuLink').click();
    cy.get('.dropdown-menu > :nth-child(1)');

  });



});