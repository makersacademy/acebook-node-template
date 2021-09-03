describe('Sign Up', function() {
  it('allows the user to enter their name', function() {
    cy.visit('/');
    
    cy.get('#sign-up-form').find('[type="text"]').type('Jim');
    cy.get('#sign-up-form').find('[type="email"]').type('email@email.com');
    cy.get('#sign-up-form').find('[type="password"]').type('1234');
    
    cy.get('#sign-up-form').submit();
  });
});
