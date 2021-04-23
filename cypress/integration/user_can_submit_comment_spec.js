describe('Timeline', function() {
  it('can submit a coment and view it', function() {
      cy.visit('/posts');
      cy.contains('Add Comment').click();
      cy.get('#new-comment-form').find('[type="text"').type('Cool story bro!')
      cy.contains('Submit').click();
      
      cy.get('.comments').should('contain', 'Cool story bro!');
  })
});