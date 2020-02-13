describe('User should be able to', function() {
  it('see posts theyre tagged in on their profile', function() {
    cy.visit('/users/login');
    cy.get('#login-form').find('[id="email"]').type('joe@gmail.com');
    cy.get('#login-form').find('[id="password"]').type('password123');
    cy.get('#login-form').submit();

    cy.contains('New post').click();
    cy.get('#new-post-form').find('[name="message"]').type('Hello, world!');
    cy.get('#new-post-form').find('[name="taglist"]').type('brad')
    cy.get('#new-post-form').submit();

    cy.visit('/users/brad')

    cy.get('[name="tagged_in"]').should('contain', 'Hello, world!');
  });
});
