describe('Home page', function() {
  it('user can signup', function(){
    cy.signup('Test', '123@gmail.com', 'password');
   });

   it('homepage redirects logged in user to their profile page', function(){
     cy.signup('Test', '123@gmail.com', 'password');
     cy.signin('Test', 'password');
     cy.visit('/');
     cy.contains('Welcome Test');
   })
});
