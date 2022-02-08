describe('Timeline', function() {
  it('can submit posts and view them', function() {
    cy.visit('/sessions/new');
    cy.get('#email')
      .type('jackie@jackie.com')
    cy.get('#password')
      .type('jackie')
    cy.get('#new-session-form').submit();
    cy.visit('/posts');
    cy.url().should('include', '/posts');
    cy.contains('Timeline').click();
    cy.get('.new-post-link').click()
    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Hello, world!');
  });
});
