describe('Log in', function(){
  it('has a fields to log in', function(){
    cy.visit('/');
    cy.contains('Log in').click();
    cy.contains('Log in').click();
    cy.get('input[name=username]').type('jane.lane')
    cy.get('input[name=password]').type('password')
    cy.get('form').submit()
  });
  });
