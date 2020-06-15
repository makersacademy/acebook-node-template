describe('Timeline', function() {
  it('can display dates', function() {
    cy.visit('/posts');
    cy.get('.posts').should('contain', 'British Summer Time');
  })
});
