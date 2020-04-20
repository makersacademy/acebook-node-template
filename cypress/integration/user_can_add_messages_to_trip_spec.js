describe('Add comments', function() {
  it('user can add comments to trip', function(){
    cy.signup('Test', '123@gmail.com', 'password');
    cy.signin('Test', 'password');
    cy.createTrip('France', '2020-06-12', '2020-06-20');

    cy.get('#comment-form').find('[type="text"]').type('Paris, here we come!')
    cy.get('#comment-form').submit();
    cy.get('body').contains('Paris, here we come!');
  });
});
