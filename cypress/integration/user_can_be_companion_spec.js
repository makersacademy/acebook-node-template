describe("Users can be companions", function(){
  it('allows a user to be a companion', function(){
    cy.task('createUser1')
    cy.task('createTripWithCompanion');
    cy.task('createUser2')
    cy.signin("Test2", '456@gmail.com');
    cy.contains('Spain');
  });

  it('allows companions to leave a trip', function(){
    cy.task('createUser1')
    cy.task('createTripWithCompanion');
    cy.task('createUser2')
    cy.signin("Test2", '456@gmail.com');
    cy.get('#leave-trip-button').submit();
    cy.get('.trip-list').should('not.contain', 'Spain')
  });

  it('does not allow companions to delete a trip', function(){
    cy.task('createUser1')
    cy.task('createTripWithCompanion');
    cy.task('createUser2')
    cy.signin("Test2", '456@gmail.com');
    cy.get('.trip-list').should('not.contain', '#delete-trip-button')
  });

  
})
