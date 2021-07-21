describe('Home page', function() {
    it('can sign out a user', function() {
      cy.visit('/');
      cy.get('#sign-up-form').find('[name = "username"]').type('eddie007');
      cy.get('#sign-up-form').find('[name = "email"]').type('eddie@example.com');
      cy.get('#sign-up-form').find('[name = "password"]').type('coach4lyf');
      cy.get('#sign-up-form').submit();
      cy.contains('Welcome!');

      cy.get('#sign-in-form').find('[name = "username"]').type('eddie007');
      cy.get('#sign-in-form').find('[name = "password"]').type('coach4lyf');
      cy.get('#sign-in-form').submit();

      cy.contains('Timeline');
      cy.get('#sign-out-button').click();

      cy.get('#sign-up-form').should('have.id', 'sign-up-form');
    });
});