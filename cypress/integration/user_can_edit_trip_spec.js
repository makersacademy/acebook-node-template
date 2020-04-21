describe('Edit trip', function() {
  it('user can edit trip date', function(){
    cy.task('createUser1')
    cy.task('createTripWithCompanion');
    cy.signin("Test", '123@gmail.com');
    cy.get('#view-trip-button').submit();
    cy.get('#edit-button').submit();
    cy.get('#edit-start-date-form').find('input[name=startDate]').type('2020-06-05');
    cy.get('#edit-start-date-form').submit();
    cy.wait(500)
    cy.contains('2020-06-05');
  });
});
