describe('Timeline', function() {
  it('allows users to like posts', function() {
    cy.visit('/sign_up');
    cy.get('#sign-up-form').find('[type="text"]').type('Shabba');
    cy.get('#sign-up-form').find('[type="email"]').type('shabba@gmail.com');
    cy.get('#sign-up-form').find('[type="password"]').type('shabba');
    cy.get('#sign-up-form').submit();

    cy.get('#sign-in-form').find('[type="email"]').type('shabba@gmail.com');
    cy.get('#sign-in-form').find('[type="password"]').type('shabba');
    cy.get('#sign-in-form').submit();

    cy.visit('/posts');
    cy.contains('Like').click();
    cy.get('.posts').should('contain', 'Likes');
  });
});
