describe('Timeline', function() {
  it('can submit posts and view them', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#message').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Hello, world!');
  });
});
