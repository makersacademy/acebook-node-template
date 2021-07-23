describe('Timeline', function() {
  it('can delete a post', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Fresh slate!');
    cy.get('#new-post-form').submit();
    
    cy.get('.delete-button:last').click();

    cy.get('.posts').should('not.contain', 'Fresh slate!');
  });
});  
