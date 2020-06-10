describe('Newsfeed', function() {
  it('can view all posts with comments', function() {
    cy.visit('/signup');
    cy.get('#new-user-form').find('[id="firstName"]').type('Berty')
    cy.get('#new-user-form').find('[id="lastName"]').type('Button')
    cy.get('#new-user-form').find('[id="email"]').type('BB@example.com')
    cy.get('#new-user-form').find('[id="password"]').type('1234')
    cy.get('#new-user-form').submit();

    cy.get('#login-form').find('[id="email"]').type('BB@example.com')
    cy.get('#login-form').find('[id="password"]').type('1234');
    cy.get('#login-form').submit();

    console.log("In spec file before cy.task");

  });
});
