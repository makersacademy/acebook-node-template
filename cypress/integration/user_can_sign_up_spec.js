describe('Sign Up', function(){

  beforeEach(() => {
    cy.visit('http://localhost:3030')
  });

  it('can let a user sign up', function(){
     cy.visit('/user/new')

    cy.get('#firstName').type('Helen');
    cy.get('#lastName').type('Smith');
    cy.get('#email').type('helensmith@gmail.com');
    cy.get('#password').type('1234');
  });
});
