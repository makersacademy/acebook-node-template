describe('Timeline', function() {
  it('can delete posts', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Remove this message');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Remove this message');

    cy.contains('Delete').click();
    cy.get('.posts').should('not.contain', 'Remove this message');
  });
});
