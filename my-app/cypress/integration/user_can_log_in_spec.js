describe('Log In', function(){

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('can let a user login', function(){
     cy.visit('/user/login')

     cy.get('#firstName').type('Helen');
     cy.get('#lastName').type('Smith');
     cy.get('#login').click()

  });
  });
