describe('Timeline', function() {
    it('can delete posts', function() {
      cy.visit('/posts');
      cy.contains('New post').click();
  
      cy.get('#new-post-form').find('[type="text"]').type('Delete this post!');
      cy.get('#new-post-form').submit();
      cy.contains('Delete').click();
  
      cy.get('.posts').should('not.contain', 'Delete this post!');
    });
  });