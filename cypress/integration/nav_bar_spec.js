const testHelper = require('../support/commands.js')

describe('Navbar', function() {
  it('shows up on homepage', function() {
    cy.visit('/');
    cy.get('nav#aceBookNavBar').should('be.visible');
  });

  it('can be used to navigate to the signup page', function() {
    cy.visit('/');
    cy.get('nav#aceBookNavBar').should('contain', 'Sign Up');
    cy.get('a#sign-up').click()
    cy.url().should('eq', 'http://localhost:3030/users/new');
    cy.get('nav#aceBookNavBar').should('be.visible');
  });

  it('can be used to navigate to the signin page', function() {
    cy.visit('/');
    cy.get('nav#aceBookNavBar').should('contain', 'Sign In');
    cy.get('a#sign-in').click()
    cy.url().should('eq', 'http://localhost:3030/sessions/new');
    cy.get('nav#aceBookNavBar').should('be.visible');
  });

  it('only shows log out and timeline button once signed in', function() {

    testHelper.signUpTestUser('123@123.com', '123'); 
    testHelper.loginTestUser('123@123.com', '123');
    cy.get('a#new-post').should('contain', 'Timeline');  
    cy.get('a#log-out').should('contain', 'Log Out'); 
  });

  it('shows active button ', function() {
    cy.visit('/');
    cy.get('nav#aceBookNavBar').should('contain', 'Sign In');
    cy.get('nav#aceBookNavBar').should('contain', 'Sign Up');
    cy.get('a#sign-in').click();
    cy.get('a#sign-in').should('have.class', 'nav-item nav-link active');
  });

}); 