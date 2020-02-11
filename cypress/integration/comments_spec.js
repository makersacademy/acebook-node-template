describe('Comments', function() {
  it('allows user to add comments to a post', function() {
    // cy.visit('/users/register');
    // cy.get('#sign-up-form').find('[id="fullname"]').type('Job Bloggs',{ force: true });
    // cy.get('#sign-up-form').find('[id="email"]').type('job@gmail.com');
    // cy.get('#sign-up-form').find('[id="username"]').type('jobbloggs');
    // cy.get('#sign-up-form').find('[id="password"]').type('password123');
    // cy.get('#sign-up-form').find('[id="repeat_password"]').type('password123');
    // cy.get('#sign-up-form').submit();

    cy.visit('/users/login');
    cy.get('#login-form').find('[id="email"]').type('job@gmail.com',{ force: true });
    cy.get('#login-form').find('[id="password"]').type('password123');
    cy.get('#login-form').submit();
    cy.get('.title').should('contain', 'Timeline');
    cy.contains('Add comment').click();
    cy.get('#comments-form').find('[type="text"]').type('Great post');
    cy.get('#comments-form').submit();

    cy.get('.posts').should('contain', 'Great post');
  });
});
