describe("Login page", function(){
  it("login success if user credentials are correct", function(){
    cy.visit('/signup'); //will change route on refactor
    cy.get('#login-form').find('[id="email"]').type('Phillip.J.Fry@planetexpress.com')
    cy.get('#login-form').find('[id="password"]').type('12345')
    cy.get('#login-form').submit();

    cy.get('.loginMessage').should('contain', 'Login sucessful')
  })
})
