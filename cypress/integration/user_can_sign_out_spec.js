describe("Sign out", function(){
  it('allows a user to sign out', function(){
    cy.signup("Test", "123@gmail.com", "password");
    cy.signin("Test", "password");

    cy.get('#logout-button').submit();
    cy.url().should('eq', 'http://localhost:3030/');
  });
});
