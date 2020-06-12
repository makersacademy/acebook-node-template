describe('Timeline', function() {
  it('can delete posts', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Delete this message');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Delete this message');

    cy.contains('Delete').click();
    cy.get('.posts').should('not.contain', 'Delete this message');
  });
});
