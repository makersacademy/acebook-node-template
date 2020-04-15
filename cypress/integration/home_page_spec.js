describe('Home page', function() {
  it('user can signup', function(){
    cy.visit('/');
    cy.get('input[name=name]').type('Test')
    cy.get('input[name=email]').type('test3@gmail.com')
    cy.get('input[name=password]').type('password')
    cy.get('form').submit()
   });
});
