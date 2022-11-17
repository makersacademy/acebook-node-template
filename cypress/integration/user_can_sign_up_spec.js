describe('Registration', () => {
  it('A user signs up and is redirected to sign in', () => {
    // sign up
    cy.visit('/users/new')
    cy.get('#first_name').type('Sarah')
    cy.get('#last_name').type('Smith')
    cy.get('#DOB').type('1981-11-06')

    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()

    cy.url().should('include', '/posts')
  })
})
