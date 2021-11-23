describe('Timeline', function() {
  it('can submit posts and view them', function() {
    cy.visit('/users/new');

    cy.get('#new-user-form').find('[type="email"]').type('123@123.com');
    cy.get('#new-user-form').find('[type="password"]').type('123');
    cy.get('#new-user-form').submit();
    cy.visit('/sessions/new');

    cy.get('#new-session-form').find('[type="email"]').type('123@123.com');
    cy.get('#new-session-form').find('[type="password"]').type('123');
    cy.get('#new-session-form').submit();

    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Hello, world!');
  });
});

