describe('logged in', function() {
  it('it will show log out button when logged in', function() {
    cy.visit('/sessions/new');
    cy.get('#email')
      .type('jackie@jackie.com')
    cy.get('#password')
      .type('jackie')
    cy.get('#new-session-form').submit();
    cy.visit('/posts');
    cy.url().should('include', '/posts');

    cy.contains('Log Out');
  });
});
