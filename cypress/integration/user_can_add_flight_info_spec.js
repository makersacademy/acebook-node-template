describe('Add flight info', function() {
  it('user can add flight info', function(){
    cy.task('createUser1')
    cy.task('createTripWithCompanion')
    cy.signin('Test', '123@gmail.com');
    cy.get('#view-trip-button').submit();
    cy.get('#edit-button').submit();
    cy.get('input[name=departureCity]').type('London');
    cy.get('input[name=airport]').type('LHR');
    cy.get('input[name=airline]').type('British Airways');
    cy.get('input[name=date]').type('2020-06-12');
    cy.get('input[name=departureTime]').type('11:00');
    cy.get('input[name=flightNumber]').type('BA0113');
    cy.get('#booking-reference-flight').type('12345');
    cy.get('#new-flight-form').submit();
    cy.contains('Flight number: BA0113');
  });
});
