describe("Create a trip", function(){
  it('allows a user to create trip', function(){
    cy.visit('user/signin');
    cy.get('input[name=name]').type('Test');
    cy.get('input[name=password]').type('password');
    cy.get('#login-form').submit();
    cy.get('#create-trip').submit();
    cy.get('input[name=destination]').type('France');
    cy.get('input[name=date-to]').type('12/06/2020');
    cy.get('input[name=date-from]').type('20/06/2020');
    cy.get('#create-trip-form').submit();
  });
});
