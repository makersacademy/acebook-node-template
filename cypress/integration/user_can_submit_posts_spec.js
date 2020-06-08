describe('Newsfeed', function() {
  it('can submit posts and view them', function() {
    cy.visit('/newsfeed');

    cy.get('#new-post-form').find('[id="new-post"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('#posts').should('contain', 'Hello, world!');
  });
});
