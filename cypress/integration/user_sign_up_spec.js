describe('Signup', function() {
  it('allows user to register', function() {
    cy.visit('/users/register');
    cy.get('#sign-up-form').find('[id="fullname"]').type('Joe Bloggs');
    cy.get('#sign-up-form').find('[id="email"]').type('joe@gmail.com');
    cy.get('#sign-up-form').find('[id="username"]').type('joebloggs');
    cy.get('#sign-up-form').find('[id="password"]').type('password123');
    cy.get('#sign-up-form').find('[id="repeat_password"]').type('password123');
    cy.get('#sign-up-form').submit();

    cy.get('.login').should('contain', 'Login');
  });
});
