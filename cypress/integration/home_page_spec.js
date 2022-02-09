describe('Home page', function() {
  it('has a title', function() {
    cy.visit('/');

    cy.get('.title').should('contain', 'Acebook');
  });

  it('has a log in button', function() {
    cy.visit('/');
    cy.contains('Log in').click();

    cy.url().should('include', '/sessions/new');
  });

  it('has a sign up button', function() {
    cy.visit('/');
    cy.contains('Sign Up').click();

    cy.url().should('include', '/users/new');
  });
  
  it('redirects to /posts if logged in', function() {
    cy.visit('/sessions/new');
    cy.get('#email').type('jackie@jackie.com');
    cy.get('#password').type('jackie');
    cy.get('#new-session-form').submit();
    cy.visit('/');

    cy.url().should('include', '/posts');
  })
});
