describe('Timeline', () => {
  it('can see a welcome message when logged in', () => {
    // sign up
    cy.visit('/users/new')
    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()

    // sign in
    cy.visit('/sessions/new')
    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()

    // Assert that we can see a welcome message with name
    cy.visit('/posts')
    cy.contains('You are logged in.')
  })
})
