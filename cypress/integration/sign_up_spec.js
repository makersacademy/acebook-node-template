describe('Sign up section', function(){
  it('has a sign up form', function() {
    cy.visit('/users/signup');
    cy.get('#sign-up-form').find('#email').type('email@test.co.uk');
    cy.get('#sign-up-form').find('#password').type('test123');
    cy.get('#sign-up-form').submit();

    cy.url().should('eq', 'http://localhost:3030/users/welcome');
    cy.get('.email').should('contain', 'email@test.co.uk');
  });
});