describe('Timeline', function() {
  it('can view comments for a post', function() {

    cy.visit('/posts');
    cy.get('#new-post-form').find('[type="text"]').type('comment test');
    cy.get('#new-post-form').submit();
    cy.get('.comment-toggle:last').click();
    cy.get('#commentform-{{this._id}}').find('[type="text"]').type('COMMENT-ONE');
    cy.get('#commentform-{{this._id}}').submit();
    //cy.get('.posts').should('contain', 'COMMENT-ONE');    
  });
});