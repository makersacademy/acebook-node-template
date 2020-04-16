describe('Add hotel info', function() {
  it('user can add hotel info', function(){
    cy.signup('Test', '123@gmail.com', 'password');
    cy.signin('Test', 'password');
    cy.createTrip('France', '2020-06-12', '2020-06-20');

    cy.get('input[name=city]').type('Paris');
    cy.get('input[name=accommodationName]').type('George V');
    cy.get('input[name=checkinDate]').type('2020-06-12');
    cy.get('input[name=checkoutDate]').type('2020-06-20');
    cy.get('#hotel-info-form').submit();
    cy.contains("George V");
  });
});
