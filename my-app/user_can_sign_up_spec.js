describe('Sign Up', function(){

  beforeEach(() => {
    cy.visit('http://localhost:8000')
  });

  it('can let a user sign up', function(){
     cy.visit('/api/post')

    cy.get('#firstName').type('Helen');
    cy.get('#lastName').type('Smith');
    cy.get('#email').type('helensmith@gmail.com');
    cy.get('#password').type('1234');
    cy.get('#submit').click()
  });

  it('requires user to fill in their first name', function(){
    cy.visit('/user/new')

    cy.get('#lastName').type('Smith');
    cy.get('#email').type('helensmith@gmail.com');
    cy.get('#password').type('1234');
    // var alerted = false;
    // cy.on('window:alert', msg => alerted = msg);
    //
    // cy.get('#submit').click()
    // .then( () => expect(alerted).to.match(/Please fill in this field./);
  });
});
