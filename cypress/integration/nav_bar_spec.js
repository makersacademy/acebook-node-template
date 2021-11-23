describe('Navbar', function() {
  it('shows up on homepage', function() {
    cy.visit('/');
    cy.get('nav#aceBookNavBar').should('contain', 'Navbar');
  });
  it('can be used to navigate to the signup page', function() {
    cy.visit('/');
    cy.get('nav#aceBookNavBar').should('contain', 'Sign Up');
    cy.get('a#sign-up').click()
    cy.url().should('eq', 'http://localhost:3030/users/new');
    cy.get('nav#aceBookNavBar').should('contain', 'Navbar');
  });
  it('can be used to navigate to the signin page', function() {
    cy.visit('/');
    cy.get('nav#aceBookNavBar').should('contain', 'Sign In');
    cy.get('a#sign-in').click()
    cy.url().should('eq', 'http://localhost:3030/sessions/new');
    cy.get('nav#aceBookNavBar').should('contain', 'Navbar');
  });
});