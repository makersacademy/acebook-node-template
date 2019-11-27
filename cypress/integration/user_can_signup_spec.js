describe('Signup', function() {
    it('can submit sign up and show success', function() {
        cy.visit('/');
  
        cy.get('input[name="firstName"]').type('terry');
        cy.get('input[name="surname"]').type('terry');
        cy.get('input[name="email"]').type('terry');
        cy.get('input[name="password"]').type('terry');
        cy.get('input[name="dob"]').type('terry');

        cy.get('#new-user-form').submit();
  
        cy.contains('success');
    });
});