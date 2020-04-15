describe("Sign in", function(){
  it('allows a user to sign in', function(){
    cy.visit('/');
    cy.get('input[name=name]').type('Test');
    cy.get('input[name=email]').type('test3@gmail.com');
    cy.get('input[name=password]').type('password');
    cy.get('form').submit();
    cy.contains('Welcome Test');
  });

  it ('does not allow a user who has not registered to sign in', function(){
    cy.visit('/');
    cy.get('input[name=name]').type('Betty');
    cy.get('input[name=email]').type('boop@gmail.com');
    cy.get('input[name=password]').type('password');
    cy.get('form').submit();
    cy.contains('User not found. Try again.');
  })
});
