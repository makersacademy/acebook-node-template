describe('Timeline', function() {
  it('can remove posts and see there changes', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.contains('Delete post').click();
    cy.get('#delete-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#delete-post-form').submit();

    cy.get('.posts').should('not.contain', 'Hello, world!');  
  });
});