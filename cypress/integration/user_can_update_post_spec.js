describe('Timeline', function() {
  it('can update a post', function() {
    cy.visit('/posts');

    cy.contains('New post').click({force:true});
    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('.update-post-link:last').click();
    cy.get('#update-post-form').find('[type="text"]').type('This was changed');
    cy.get('#update-post-form').submit();

    cy.get('.posts').should('contain', 'This was changed');
    cy.get('.delete-button:last').click();

  });
});
