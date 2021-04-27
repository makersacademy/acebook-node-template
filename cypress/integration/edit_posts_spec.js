describe('Timeline', function() {
    it('can edit posts', function() {
      cy.visit('/posts');
      cy.contains('New post').click();
      // cy.get('[disabled]').click({force: true});
      cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
      cy.get('#new-post-form').submit();
  
      cy.get('.cards').should('contain', 'Hello, world!');

      cy.get('#edit-post-form').find('#message').type('Foxes');
      cy.get('#edit-post-form').submit();
      cy.get('.cards').should('contain', 'Foxes');
    });
  });