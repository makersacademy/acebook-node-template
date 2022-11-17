describe.skip('Home page', () => {
  it('has a title', () => {
    cy.visit('/')
    cy.get('.title').should('contain', 'Acebook')
  })
  it('has a login link', () => {
    cy.visit('/')
    cy.get('#login-link').should('contain', 'Login here')
    cy.get('#login-link').click()
    cy.url().should('include', '/sessions/new')
  })
  it('has a sign up link', () => {
    cy.visit('/')
    cy.get('#signup-link').should('contain', 'Sign up here')
    cy.get('#signup-link').click()
    cy.url().should('include', '/users/new')
  })
})
