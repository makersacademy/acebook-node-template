describe('Users should', function() {
  it('be able to accept friend requests', function() {

    cy.visit('/users/login');
    cy.get('#login-form').find('[id="email"]').type('brad@gmail.com'); //hashtag refers to form id
    cy.get('#login-form').find('[id="password"]').type('password123');
    cy.get('#login-form').submit();

    cy.visit('/users/profile');
    cy.contains('Connect & Search').click();

    cy.get('#search').find('[id="fullname"]').type('joe'); //hashtag refers to form id
    cy.get('#search').submit();

    cy.contains('View profile').click();
    cy.contains('Add Friend').click();

    cy.contains('Posts').click();
    cy.contains('Logout').click();

    cy.contains('Login').click();
    cy.get('#login-form').find('[id="email"]').type('joebloggs@gmail.com'); //hashtag refers to form id
    cy.get('#login-form').find('[id="password"]').type('password123');
    cy.get('#login-form').submit();

    cy.visit('/users/profile');
    cy.contains('Friend Requests').click();
    cy.contains('Accept').click();

    cy.get('.fl').should('contain', 'brad')


  });
});
