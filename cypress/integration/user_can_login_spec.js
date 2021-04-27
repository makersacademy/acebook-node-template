describe('Login', function() {
    it('can authenitcate an existing user', function() {
      cy.visit('/');
  
      cy.get('#sign-up-form').find('#fname').type('test_user_2');
      cy.get('#sign-up-form').find('#pword').type('password2');
  
      cy.get('#login-form').find('#loginUsername').type('test_user_2');
      cy.get('#login-form').find('#loginPassword').type('password2');
      
      cy.get('#login-form').submit();
      cy.should('contain', 'Timeline');
    });
});
  