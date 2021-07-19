describe('Home page', function() {
    it('can sign in a user', function() {
      cy.visit('/');
      cy.get('#sign-up-form').find('[name = "username"]').type('emma7563');
      cy.get('#sign-up-form').find('[name = "email"]').type('emma@example.com');
      cy.get('#sign-up-form').find('[name = "password"]').type('ilovethenorrf');
      cy.get('#sign-up-form').submit();
      cy.contains('Welcome, emma7563');

      cy.get('#sign-in-form').find('[name = "username"]').type('emma7563');
      cy.get('#sign-in-form').find('[name = "password"]').type('ilovethenorrf');
      cy.get('#sign-in-form').submit();

      cy.contains('.posts');
    });
});