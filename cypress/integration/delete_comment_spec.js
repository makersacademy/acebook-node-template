describe('Timeline', function() {
  it('can delete comment', function() {
    cy.visit('/')
    cy.get('input.fname').type('Delete Com')
    cy.get('input#pword').type('Delete')
    cy.get('.registration-form').submit();
    
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();
    cy.get('#new-comment-form').find('[type="text"]').type('Delete Comment');
    cy.get('#new-comment-form').submit();
    cy.contains('Delete').click();


    cy.get('.posts').should('not.contain', 'Delete Comment');
  });
});