describe('Timeline', function() {
  it('stops non-logged in user from viewing posts', function() {
    cy.visit('/posts');
    cy.get('.login-form').should('contain', 'Login to Acebook');
  });

  it('can submit posts and view them', function() {
    cy.visitSignUpPage();
    cy.signUpNewUser("Hermione Granger", "hermione");

    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Hello, world!');
  });
});
