describe('Timeline', function() {
  it('can view comments on a post', function() {

    cy.visit('/posts');
    cy.get('.new-post-link').click();
    cy.get('#new-post-form').find('[type="text"]').type('comment test');
    cy.get('#new-post-form').submit();
    cy.get('.comment-toggle').click();
    cy.get('.form-container').find('[type="text"]').type('COMMENT-ONE');
    cy.get('.form-container').submit();
    cy.get('.comment-list').should('contain', 'COMMENT-ONE');    
  });
});