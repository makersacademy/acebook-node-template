describe('likes counter', function() {
  it('it will increment by 1 each time a button is clicked', function() {
    cy.visit('/sessions/new');
    cy.get('#email')
      .type('jackie@jackie.com')
    cy.get('#password')
      .type('jackie')
    cy.get('#new-session-form').submit();
    cy.visit('/posts');
    cy.contains('Like').click();
    cy.contains(1);
  });
});
