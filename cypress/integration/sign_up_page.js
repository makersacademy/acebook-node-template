describe('Signup page', function() {
  it('can see the sign up page', function() {
    cy.visit('/signup');
    cy.get('.signup-title').should('contain', 'Sign up to AceBook');
  });

  xit('can sign up to Acebook', function() {
    
  })
});
