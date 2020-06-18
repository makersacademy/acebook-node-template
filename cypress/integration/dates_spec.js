describe('Timeline', function() {
  it('can display dates', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Message');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Message');
    cy.get('.posts').should('contain', 'British Summer Time');
  });
});
