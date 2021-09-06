describe('Nav bar links', function() {
  it('a user can move between pages using links', function() {
    cy.visit('/posts');
    cy.contains('New Post').click()
    cy.url('/posts/new')
    cy.contains('Timeline').click()
    cy.url('/posts')
  });
});

// tests for log out and profile links to be written once functional