describe('Login', function() {
  before(async (done) => {
    await cy.task("db:drop:all");
    done();
  })
    it('can authenticate an existing user', function() {
      cy.visit('/');
  
      cy.get('.registration-form').find('#fname').type('test_user_2');
      cy.get('.registration-form').find('#pword').type('password2');
      cy.get('.registration-form').submit();
      cy.get('#logoutbutton').submit();
      cy.get('input#loginUsername').type('test_user_2');
      cy.get('input#loginPassword').type('password2');
      
      cy.get('.login-form').submit();
      cy.contains('User Posts');
    });
});
  