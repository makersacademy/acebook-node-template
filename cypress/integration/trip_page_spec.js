describe('Trip page', function() {
  it('user can view trip info', function(){
    cy.signup("Test", "123@gmail.com", "password");
    cy.signin("Test", "password");
    cy.createTrip("France", "2020-06-12", "2020-06-20");
    cy.contains("France Fri Jun 12 2020 01:00:00 GMT+0100 (British Summer Time) Sat Jun 20 2020 01:00:00 GMT+0100 (British Summer Time)");
  });
});
