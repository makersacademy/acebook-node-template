describe("Login page", function(){
  it("login success if user credentials are correct", function(){
    cy.visit('/');
    cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#login-form').find('[id="password"]').type('12345')
    cy.get('#login-form').submit();

    cy.get('.login-message').should('contain', 'Welcome');
    // cy.get('.loginMessage').should('contain', 'Login sucessful')
  })

  it("login fails if user credentials are incorrect", function() {
    cy.visit('/'); //will change route on refactor
    cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    cy.get('#login-form').find('[id="password"]').type('wrong')
    cy.get('#login-form').submit();

    cy.get('.loginMessage').should('contain', 'Login unsuccessful: incorrect email or password.');
  });
})
