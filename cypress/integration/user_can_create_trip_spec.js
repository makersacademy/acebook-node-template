describe("Create a trip", function(){
  it('allows a user to create trip', function(){
    cy.signup("Test", "123@gmail.com", "password");
    cy.signin("Test", "password");

    cy.get('#create-trip-button').submit();
    cy.get('input[name=destination]').type('France');
    cy.get('input[name=startDate]').type('2020-06-12');
    cy.get('input[name=endDate]').type('2020-06-20');
    cy.get('#new-trip-form').submit();
  });

});
