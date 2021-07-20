describe('Home page', function() {
    it('can sign out a user', function() {
      cy.visit('/sessions');
      cy.get('#sign-in-form').find('[name = "username"]').type('emma7563');
      cy.get('#sign-in-form').find('[name = "password"]').type('ilovethenorrf');
      cy.get('#sign-in-form').submit();

      cy.contains('Timeline');
      cy.get('#sign-out-button').click();
      cy.contains('#sign-up-form');
    });
});