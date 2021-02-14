describe('Timeline', function() {
  it('can submit posts and view them', function() {
    cy.visit('/content/new');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();
    cy.url().should('include', '/dashboard')

    cy.get('.posts').should('contain', 'Hello, world!');
  });
});
