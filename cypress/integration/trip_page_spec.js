describe('Trip page', function() {
  it('user can view trip info', function(){
    cy.task('createUser1')
    cy.signin('Test', '123@gmail.com');
    cy.createTrip("France", "2020-06-12", "2020-06-20");
    cy.contains("France");
  });
});
