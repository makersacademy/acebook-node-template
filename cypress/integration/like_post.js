describe('a user can like a post', function() {
  it('has a like button under each post', function() {
    cy.visit('/posts')
    cy.contains('Like').click()
    //expecting Likes to show 1
    
  });
});