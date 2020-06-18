describe('Timeline', function() {
  it('can delete posts', function() {
    cy.visit('/sign_up');
    cy.get('#sign-up-form').find('[type="text"]').type('Shabba');
    cy.get('#sign-up-form').find('[type="email"]').type('shabba@gmail.com');
    cy.get('#sign-up-form').find('[type="password"]').type('shabba');
    cy.get('#sign-up-form').submit();

    cy.get('#sign-in-form').find('[type="email"]').type('shabba@gmail.com');
    cy.get('#sign-in-form').find('[type="password"]').type('shabba');
    cy.get('#sign-in-form').submit();

    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Remove this message');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Remove this message');

    cy.contains('Delete').click();
    cy.get('.posts').should('not.contain', 'Remove this message');
  });
});
