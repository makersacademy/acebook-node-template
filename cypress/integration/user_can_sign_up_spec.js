describe('Sign up', function(){
  it('has a fields to sign up', function(){
    cy.visit('/user');
    cy.contains('Sign up').click();
    cy.get('input[name=username]').type('jane.lane')
    cy.get('input[name=password]').type('password')
    cy.get('form').submit()
  });
  });
