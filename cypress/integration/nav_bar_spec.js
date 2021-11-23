describe('Navbar', function() {
  it('shows up on homepage', function() {
    // visit homepage
    cy.visit('/');
    // expect to see nav bar
    cy.get('nav#aceBookNavBar').should('contain', 'Navbar');
  });
});