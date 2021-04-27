describe('Timeline', function() {
    it('can edit posts', function() {
      cy.visit('/posts');
      cy.contains('New post').click();
  
      cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
      cy.get('#new-post-form').submit();
  
      cy.get('.posts').should('contain', 'Hello, world!');

      cy.get('#edit-post-form').find('[type="text"]').type('Foxes');
      cy.get('#edit-post-form').submit();
      cy.get('.posts').should('contain', 'Foxes');
    });
  });