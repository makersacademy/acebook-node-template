describe('Timeline', function() {
    it('can edit posts', function() {
      cy.visit('/')
      cy.get('input.fname').type('Edit')
      cy.get('input#pword').type('Edit')
      cy.get('.registration-form').submit();
      
      cy.visit('/posts');
      cy.contains('New post').click();
      cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
      cy.get('#new-post-form').submit();
  
      cy.get('.cards').should('contain', 'Hello, world!');

      cy.get('#edit-post-form').find('#message').type('Foxes');
      cy.get('#edit-post-form').submit();
      cy.get('.cards').should('contain', 'Foxes');
    });
  });