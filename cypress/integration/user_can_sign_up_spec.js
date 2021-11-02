describe('Sign up', function() {
  it('can make a new account', function() {
    cy.visit('/');
    cy.contains('Sign Up').click();
    cy.get('#new-user-form').find('#name').type("Hermione Granger");
    cy.get('#new-user-form').find('#email').type('hermione@example.com');
    cy.get('#new-user-form').find('#password').type('12345');
    cy.get('#new-user-form').submit();

    cy.get('h1').should('contain', 'Timeline');
  });
});