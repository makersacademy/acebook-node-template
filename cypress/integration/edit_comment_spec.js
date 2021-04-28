describe('Timeline', function() {
    before(async (done) => {
        await cy.task("db:drop:all");
        done();
      })
    it('can delete comment', function() {
      cy.visit('/')
      cy.get('input.fname').type('Edit Com')
      cy.get('input#pword').type('Edit')
      cy.get('.registration-form').submit();
      
      cy.visit('/posts');
      cy.contains('New post').click();
  
      cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
      cy.get('#new-post-form').submit();

      cy.get('#new-comment-form').type('Unedited comment');
      cy.get('#new-comment-form').submit();

      cy.get('#edit-comment-form').type('Edited comment');
      cy.get('#edit-comment-form').submit();
  
      cy.get('.posts').should('not.contain', 'Unedited comment');
    });
  });