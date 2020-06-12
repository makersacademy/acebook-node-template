describe('Newsfeed', function() {
  it('can submit posts and view them', function() {
    cy.task('emptyUsers');
    cy.task('emptyPosts');
    cy.task('insertUser', {firstName: 'Lomothy', lastName: 'Mockins', email: 'Lomothy.Tomins@example.com', password: '12345', profilePicture: ""});
    cy.visit('/');
    cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#login-form').find('[id="password"]').type('12345')
    cy.get('#login-form').submit();

    cy.get('#new-post-form').find('[id="new-post"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('#posts').should('contain', 'Hello, world!');
  });
});
