describe("Delete a trip", function(){
  it('allows a user to delete trip', function(){
    cy.signup("Test", "123@gmail.com", "password");
    cy.signin("Test", "password");
    // User creates a trip
    cy.get('#create-trip-button').submit();
    cy.get('input[name=destination]').type('France');
    cy.get('input[name=startDate]').type('2020-06-12');
    cy.get('input[name=endDate]').type('2020-06-20');
    cy.get('#new-trip-form').submit();
    // User deletes a trip
    cy.get('#delete-trip-button').submit();
    cy.get('.content').should('not.contain', 'France')
  });
});