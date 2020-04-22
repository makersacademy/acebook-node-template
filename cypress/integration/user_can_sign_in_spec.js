describe("Sign in", function(){
  it('allows a user to sign in', function(){
    cy.signup("Test", "123@gmail.com", "password");
    cy.signin("Test", '123@gmail.com');
    cy.contains('Welcome Test');
  });

  it ('does not allow a user who has not registered to sign in', function(){
    cy.visit('user/signin');
    cy.get('input[name=name]').type('Boop');
    cy.get('input[name=password]').type('password');
    cy.get('#login-form').submit();
    cy.contains('User not found. Try again.');
  })

  it('redirects a logged in user to their profile', function(){
    cy.signup('Test', '123@gmail.com', 'password');
    cy.signin('Test', '123@gmail.com');
    cy.visit('user/signin');
    cy.contains('Welcome Test');
  })
});
