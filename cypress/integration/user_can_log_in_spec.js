describe('Log in', function(){
  it('has a fields to log in', function(){
    cy.visit('/');
    cy.get('#username').find('[type="text"]').type('sheep');
    cy.get('#username').contains('sheep');
  });
});
