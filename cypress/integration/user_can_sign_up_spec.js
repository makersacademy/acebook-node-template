describe("Sign up page", function(){
  it('has a title', function(){
    cy.visit('/signup');
    cy.get('.title').should('contain', 'Signup to Acebook');
  });
});
