describe("Create a trip", function(){
  it('allows a user to create trip', function(){
    cy.visit('user/signin');
    cy.get('input[name=name]').type('Test');
    cy.get('input[name=password]').type('password');
    cy.get('#login-form').submit();
    ///
    cy.get('#create-trip-button').submit();
    cy.get('input[name=destination]').type('France');
    cy.get('input[name=startDate]').type('2020-06-12');
    cy.get('input[name=endDate]').type('2020-06-20');
    cy.get('#new-trip-form').submit();
  });
});
