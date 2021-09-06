describe('Comments', function() {
  // This should be split in two
  it('can comment and see there comments displayed', function() {
    cy.visit('/posts');
    cy.contains('comment').click();

    cy.get('#new-comment-form').find('[type="text"]').type('Comment1');
    cy.get('#new-comment-form').submit();

    // This test should be refactored to test for the comment by id instead of possibly allowing coincidences to past the test
    cy.get('/posts/comments').should('contain', 'Comment1');
  });
});