describe("Sign up page", function(){
  it('has a title', function() {
    cy.visit('/signup');
    cy.get('.title').should('contain', 'Signup to Acebook');
  });

  it('user can enter sign up info', function() {
    cy.visit('/signup');
    cy.get('#new-user-form').find('[id="firstName"]').type('Phillip')
    cy.get('#new-user-form').find('[id="lastName"]').type('J.Fry')
    cy.get('#new-user-form').find('[id="email"]').type('Phillip.J.Fry@planetexpress.com')
    cy.get('#new-user-form').find('[id="password"]').type('12345')
    cy.get('#new-user-form').submit();

    cy.get('.firstName').should('contain', 'Phillip');
    cy.get('.lastName').should('contain', 'J.Fry');
    cy.get('.email').should('contain', 'Phillip.J.Fry@planetexpress.com');
    cy.get('.password').should('contain', '12345');
  });
});


// Session
// have a setting page = lastname / email and shit gets saved
