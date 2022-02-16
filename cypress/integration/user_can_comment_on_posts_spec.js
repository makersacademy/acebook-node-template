describe('Timeline', function() {
  it('can comment on posts', function() {
    cy.visit('/sessions/new');
    cy.get('#email').type('jackie@jackie.com')
    cy.get('#password').type('jackie')
    cy.get('#new-session-form').submit();
    cy.visit('/posts');
    cy.url().should('include', '/posts');
    cy.get('#comment-form').first().find('[type="text"]').type('Test comment for integration');
    cy.get('#comment-form').submit();
    cy.visit('/posts');
    cy.get('.comments').first().should('contain', 'Test comment for integration');
  });
});
