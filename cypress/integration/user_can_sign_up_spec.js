describe('Home page', function() {
  it('can sign up a user', function() {
    cy.visit('/');
    cy.get('#sign-up-form').find('[name = "username"]').type('ehelsan13');
    cy.get('#sign-up-form').find('[name = "email"]').type('ehelsan@e.com');
    cy.get('#sign-up-form').find('[name = "password"]').type('hello');
    cy.get('#sign-up-form').submit();
    cy.contains('Welcome, ehelsan13');
  });
});
