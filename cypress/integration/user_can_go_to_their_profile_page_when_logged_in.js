describe('Timeline', () => {
  it('user can click on a link to their profile page when logged in', () => {
    // sign up
    cy.visit('/users/new')
    cy.get('#first_name').type('Sarah')
    cy.get('#last_name').type('Smith')
    cy.get('#email').type('bob@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()

    // sign in
    cy.visit('/sessions/new')
    cy.get('#email').type('bob@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()

    // Assert that we can click on a link that takes us to profile page after login
    cy.visit('/posts')
    cy.get('#profile-link').should('contain', 'My profile')
    cy.get('#profile-link').click()
    cy.url().should('include', '/posts/profile')
  })
})
