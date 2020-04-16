describe('Add flight info', function() {
  it('user can add flight info', function(){
    cy.signup('Test', '123@gmail.com', 'password');
    cy.signin('Test', 'password');
    cy.createTrip('France', '2020-06-12', '2020-06-20');

    cy.get('input[name=airline]').type('British Airways');
    cy.get('input[name=departureAirport]').type('LHR');
    cy.get('input[name=departureTime]').type('11:00');
    cy.get('input[name=flightNumber]').type('BA0113');
    cy.get('#flight-info-form').submit();
    cy.contains('British Airways BA0113');
  });
});
