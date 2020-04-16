describe('Home page', function() {
  it('user can signup', function(){
    cy.signup("Test", "123@gmail.com", "password");
   });
});
