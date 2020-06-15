describe('Timeline', function(){
  it('allows users to like posts', function(){
    cy.visit('/posts');
    cy.contains('Like').click();
    cy.get('.posts').should('contain', 'Likes');
  });
});
