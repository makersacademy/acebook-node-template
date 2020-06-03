describe("Sign up page", function(){
  it('has a title', function() {
    cy.visit('/signup');
    cy.get('.title').should('contain', 'Signup to Acebook');
  });

  it('user can enter sign up info', function() {
    cy.visit('/signup');
    cy.get('#new-user-form').find('[type="text"]').type('John')
    cy.get('#new-user-form').submit();

    cy.get('.firstName').should('contain', 'John');
  });
});
