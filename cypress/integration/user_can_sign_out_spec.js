describe("Sign out", function(){
  it('allows a user to sign out', function(){
    cy.visit('user/signin');
    cy.get('input[name=name]').type('Test');
    cy.get('input[name=password]').type('password');
    cy.get('#login-form').submit();
    cy.get('#logout-button').submit();
    cy.url().should('eq', 'http://localhost:3030/');
  });
});
