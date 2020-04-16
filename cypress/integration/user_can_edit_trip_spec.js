describe('Edit trip', function() {
  it('user can edit trip date', function(){
    cy.signup('Test', '123@gmail.com', 'password');
    cy.signin('Test', 'password');
    cy.createTrip('France', '2020-06-12', '2020-06-20');

    cy.get('input[name=startDate').type('');
    cy.get('#').submit();
    cy.contains('');
  });
});
