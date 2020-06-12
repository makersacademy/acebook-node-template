describe('Sign Up', function(){

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('can let a user sign up', function(){
     cy.visit('/user/new')

     cy.get('#firstName').type('Helen');
     cy.get('#lastName').type('Smith');
     cy.get('#Email').type('helensmith@gmail.com');
     cy.get('#password-id').type('123456');
     cy.get('#createUser').click()

  });

  it('requires user to fill in their first name', function(){
    cy.visit('/user/new')

    cy.get('#firstName').type('Helen');
    cy.get('#lastName').type('Smith');
    cy.get('#password-id').type('123456');
     cy.get('#createUser').click()
  });

  it('requires user to fill in their email', function(){
    cy.visit('/user/new')

    cy.get('#lastName').type('Smith');
    cy.get('#Email').type('helensmith@gmail.com');
    cy.get('#password-id').type('123456');
     cy.get('#createUser').click()
     cy.get('#signupform').should('have.value', 'Please fill in this field')

  });


    it('requires user to fill in their password with over 6 characters', function(){
      cy.visit('/user/new')

      cy.get('#lastName').type('Smith');
      cy.get('#Email').type('helensmith@gmail.com');
      cy.get('#password-id').type('1234');
      expect('#password-id').to.have.length(12)
    });

    it('enables user to tick the password checkbox', function(){
      cy.get('#checkbox').type("checkbox").check()
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
      console.log("err :" + err)
      console.log("runnable :" + runnable)
      return false
  })

});
