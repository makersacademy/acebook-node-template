describe('Edit trip', function() {
  it('user can edit trip date', function(){
    cy.signup('Test', '123@gmail.com', 'password');
    cy.signin('Test', 'password');
    cy.createTrip('France', '2020-06-12', '2020-06-20');
    cy.get('#view-trip-button').submit();
    cy.get('#edit-button').submit();
    cy.get('input[name=startDate]').type('2020-06-05');
    cy.get('#edit-start-date-form').submit();
    cy.contains('Jun 05 2020');
  });
});
