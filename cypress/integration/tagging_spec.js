describe('User should be able to', function() {
  it('tag users in posts', function() {
    cy.visit('/users/login');
    cy.get('#login-form').find('[id="email"]').type('joe@gmail.com');
    cy.get('#login-form').find('[id="password"]').type('password123');
    cy.get('#login-form').submit();

    cy.contains('New post').click();
    cy.get('#new-post-form').find('[name="message"]').type('Hello, world!');
    cy.get('#new-post-form').find('[name="taglist"]').type('max')
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'max');
  });
});
