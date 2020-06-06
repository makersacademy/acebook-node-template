describe("Sign up page", function(){
  it('has a title', function() {
    cy.visit('/signup');
    cy.get('.title').should('contain', 'Signup to Acebook');
  });

  it('user can sign up', function() {
    cy.visit('/signup');
    cy.get('#new-user-form').find('[id="firstName"]').type('Lomothy')
    cy.get('#new-user-form').find('[id="lastName"]').type('Tomins')
    cy.get('#new-user-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#new-user-form').find('[id="password"]').type('12345')
    cy.get('#new-user-form').submit();

   
    cy.get('.signupMessage').should('contain', 'Sign up sucessful.');
    cy.get('.firstName').should('equal', 'Lomothy');
  });

  it('cannot use an email that is already registered', function() {
    cy.visit('/signup');
    cy.get('#new-user-form').find('[id="firstName"]').type('Lomothy')
    cy.get('#new-user-form').find('[id="lastName"]').type('Tomins')
    cy.get('#new-user-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#new-user-form').find('[id="password"]').type('12345')
    cy.get('#new-user-form').submit();

    cy.get('.signupMessage').should('contain', 'This email is already registered.');
  })
});
