describe('Timeline', function() {
  it('can view comments on a post', function() {

    cy.visit('/posts');
    cy.get('.new-post-link').click();
    cy.get('#new-post-form').find('[type="text"]').type('comment test');
    cy.get('#new-post-form').submit();
    cy.get('.comment-toggle:last').click();
    cy.get('.form-container:last').find('[type="text"]').type('COMMENT-ONE');
    cy.get('.form-container:last').submit();
    cy.get('.comment-list:last').should('contain', 'COMMENT-ONE');    
  });
});