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

  it ('can submit a post, go to their profile page and only see their posts', () => {
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
    // create a post
    cy.visit('/posts')
    cy.contains('New post').click()
    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!')
    cy.get('#new-post-form').submit()
    // goes to profile page
    cy.visit('/posts')
    cy.get('#profile-link').should('contain', 'View your profile')
    cy.get('#profile-link').click()
    cy.get('.posts').eq(0).should('contain.text', 'Hello, world!')
  })
})
