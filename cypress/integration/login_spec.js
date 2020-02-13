describe('Login', function() {
  it('allows user to sign up and log in', function() {
     cy.visit('/users/login');

    // cy.get('#sign-up-form').find('[id="fullname"]').type('Joe Bloggs');
    // cy.get('#sign-up-form').find('[id="email"]').type('joe@gmail.com');
    // cy.get('#sign-up-form').find('[id="username"]').type('joebloggs');
    // cy.get('#sign-up-form').find('[id="password"]').type('password123');
    // cy.get('#sign-up-form').find('[id="repeat_password"]').type('password123');
    // cy.get('#sign-up-form').submit();

    cy.get('#login-form').find('[id="email"]').type('joe@gmail.com');
    cy.get('#login-form').find('[id="password"]').type('password123');
    cy.get('#login-form').submit();
    cy.get('.title').should('contain', 'Timeline');        // expected to go to the Acebook homepage
  });
});
