describe('Sign in', function () {
  it('can sign in a returning user', function () {
    cy.visitSignUpPage();
    cy.signUpNewUser('Freddy', 'freddy');
    cy.logOutUser();
    cy.visitSignInPage();
    cy.signInUser('freddy', '12345');

    cy.get('title').should('contain', 'Posts');
    cy.get('#alert-message').should('contain', 'Welcome back, Freddy!');
  });

  it("Doesn't allow log in for non-existing user", function () {
        cy.visitSignInPage();
        cy.signInUser('einstein', '12345');
        cy.get('title').should('contain', 'Log In');
        cy.get('#alert-message').should('contain', 'User not found!');
  });
});
