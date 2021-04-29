describe('Timeline', function () {
    beforeEach(async (done) => {
        await cy.task("db:drop:all");
        done();
      })

    it('can like posts', function () {
      cy.visit('/')
      cy.get('input.fname').type('Like')
      cy.get('input#pword').type('Like')
      cy.get('.registration-form').submit();
  
      cy.visit('/posts');
      cy.contains('New post').click();
  
      cy.get('#new-post-form').find('[type="text"]').type('Like this post!');
      cy.get('#new-post-form').submit();
      
      cy.contains('Like').click();
  
      cy.get('.likes').contains(1);
    });
});