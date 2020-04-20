describe('Add flight info', function() {
  it('user can add flight info', function(){
    cy.signup('Test', '123@gmail.com', 'password');
    cy.signin('Test', 'password');
    cy.createTrip('France', '2020-06-12', '2020-06-20');

    cy.get('input[name=departureCity]').type('London');
    cy.get('input[name=airport]').type('LHR');
    cy.get('input[name=airline]').type('British Airways');
    cy.get('input[name=date]').type('2020-06-12');
    cy.get('input[name=departureTime]').type('11:00');
    cy.get('input[name=flightNumber]').type('BA0113');
    cy.get('input[name=bookingReference]').type('12345');
    cy.get('#flight-info-form').submit();
    cy.contains('London LHR British Airways Fri Jun 12 2020 01:00:00 GMT+0100 (British Summer Time) 11:00 BA0113 12345');
  });
});
