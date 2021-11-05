describe('Sign out', function () {
  it('should end session when user logs out', function () {
    cy.visitSignUpPage();
    cy.signUpNewUser('SignOut', 'signout');

    cy.logOutUser();

    cy.visit('/posts');
    cy.get('.login-form').should('exist');
  });

  it('should not have a sign out button for non-logged in users', function () {
    cy.visit('/');
    cy.get('#no-session-state').should('exist');
    cy.get('#logout-form').should('not.exist');
  });

  it('should have a logout button for logged in users', function () {
    cy.visit('/');
    cy.visitSignInPage();
    cy.signInUser('freddy', '12345');

    cy.get('#no-session-state').should('not.exist');
    cy.get('#logout-form').should('exist');
  });
});
