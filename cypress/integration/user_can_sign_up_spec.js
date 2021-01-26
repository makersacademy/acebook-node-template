describe("Sign up page", function(){
  it('user can sign up', function() {
    cy.task('emptyPosts');
    cy.task('emptyUsers');
    cy.visit('/user/signup');
    cy.get('#new-user-form').find('[id="firstName"]').type('Lomothy')
    cy.get('#new-user-form').find('[id="lastName"]').type('Tomins')
    cy.get('#new-user-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#new-user-form').find('[id="password"]').type('12345')
    cy.get('#new-user-form').submit();

    cy.get('#login-message').should('contain', 'Sign up successful.');
  });

  it('cannot use an email that is already registered', function() {
    cy.visit('/user/signup');
    cy.get('#new-user-form').find('[id="firstName"]').type('Lomothy')
    cy.get('#new-user-form').find('[id="lastName"]').type('Tomins')
    cy.get('#new-user-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#new-user-form').find('[id="password"]').type('12345')
    cy.get('#new-user-form').submit();

    cy.get('#login-message').should('contain', 'This email is already registered.');
  })
});
