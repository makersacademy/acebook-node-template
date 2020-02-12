describe('Friend request', function() {
  it('allows users to add friends', function() {
    cy.visit('/users/register');
    cy.get('#sign-up-form').find('[id="fullname"]').type('Brad');
    cy.get('#sign-up-form').find('[id="email"]').type('brad@gmail.com');
    cy.get('#sign-up-form').find('[id="username"]').type('brad');
    cy.get('#sign-up-form').find('[id="password"]').type('password123');
    cy.get('#sign-up-form').find('[id="repeat_password"]').type('password123');
    cy.get('#sign-up-form').submit();


    cy.visit('/users/login');
    cy.get('#login-form').find('[id="email"]').type('brad@gmail.com'); //hashtag refers to form id
    cy.get('#login-form').find('[id="password"]').type('password123');
    cy.get('#login-form').submit();

    cy.visit('/users/profile');
    cy.contains('Connect & Search').click();

    cy.get('#search').find('[id="username"]').type('iryna'); //hashtag refers to form id
    cy.get('#search').submit(); 

    cy.contains('View profile').click();
    cy.contains('Add friend').click();
    cy.get('.friends').should('contain', 'Friend request sent');


  });
});
