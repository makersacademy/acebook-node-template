describe('Add comments', function() {
  it('user can add comments to trip', function(){
    cy.task('createUser1')
    cy.task('createTripWithCompanion')
    cy.signin('Test', 'password');
    cy.get('#view-trip-button').submit();
    cy.get('#chat-messages').find('[type="text"]').type('Madrid, here we come!')
    cy.get('#chat-messages').submit();
    cy.get('body').contains('Madrid, here we come!');
  });
});
