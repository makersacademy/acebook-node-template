describe('Newsfeed', function() {
  it('can view all posts in chronological order', function() {
    cy.visit('/newsfeed');
    cy.get('#posts').should('contain', 'I met a lovely dog today - by Jimothy Saladberg - Posted on 03/06/2020');
  });
});