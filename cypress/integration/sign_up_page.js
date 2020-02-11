describe('Signup page', function() {
  it('can see the sign up page', function() {
    cy.visit('/signup');
    cy.get('.signup-title').should('contain', 'Sign up to AceBook');
  });

  it('can sign up to Acebook', function() {
    cy.visit('/signup');
    cy.get('#firstname').type('John');
    cy.get('#second-name-input').type('Smith');
    cy.get('#email-entry').type('JohnS@gmail.com');
    cy.get('#password-entry').type('password1');

    cy.contains('Sign Up!').click();

    cy.get('.title').should('contain', 'Acebook');
  });
});
