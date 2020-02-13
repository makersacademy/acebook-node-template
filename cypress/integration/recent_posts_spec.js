describe('User should be able to', function() {
  it('see their recent posts', function() {
    cy.visit('/users/login');
    cy.get('#login-form').find('[id="email"]').type('joe@gmail.com');
    cy.get('#login-form').find('[id="password"]').type('password123');
    cy.get('#login-form').submit();

    cy.contains('New post').click();
    cy.get('#new-post-form').find('[name="message"]').type('Hello, world!');
    cy.get('#new-post-form').submit();
    cy.visit('/users/profile');

    cy.get('[name="recent_posts"]').should('contain', 'Hello, world!');
  });
});
