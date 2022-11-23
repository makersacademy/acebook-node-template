describe('Timeline', () => {
  it('can see a personalised welcome message when logged in', () => {
    // sign up
    cy.visit('/users/new')
    cy.get('#first_name').type('Sarah')
    cy.get('#last_name').type('Smith')
    cy.get('#DOB').type('2002-03-03')
    cy.get('#email').type('bob@example.com')
    cy.get('#password').type('pasSword!2')
    cy.get('#submit').click()

    // sign in
    cy.visit('/sessions/new')
    cy.get('#email').type('bob@example.com')
    cy.get('#password').type('pasSword!2')
    cy.get('#submit').click()

    // Assert that we can see a welcome message with name
    cy.visit('/posts')
    cy.contains('Hello, Sarah, you are logged in.')
  })
})
