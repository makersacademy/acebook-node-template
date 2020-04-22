describe("Delete a trip", function(){
  it('allows a user to delete trip', function(){
    cy.task('createUser1')
    cy.task('createTripWithCompanion');
    cy.signin("Test", '123@gmail.com');
    // User deletes a trip
    cy.get('#delete-trip-button').submit();
    cy.get('.trip-list').should('not.contain', 'Spain')
  });
});