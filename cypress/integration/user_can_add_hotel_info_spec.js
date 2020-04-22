describe('Add hotel info', function() {
  it('user can add hotel info', function(){
    cy.task('createUser1')
    cy.task('createTripWithCompanion')
    cy.signin('Test','123@gmail.com');
    cy.get('#view-trip-button').submit();
    cy.get('#edit-button').submit();
    cy.get('input[name=location]').type('Madrid');
    cy.get('#start-date-hotel').type('2020-06-12');
    cy.get('#end-date-hotel').type('2020-06-20');
    cy.get('#booking-reference-accommodation').type('HKKLRO');
    cy.get('#new-accommodation-form').submit();
    cy.contains("HKKLRO");
  });
});
