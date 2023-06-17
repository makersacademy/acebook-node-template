describe('Timeline', () => {
  it('can submit a post and view it', () => {
    // submit a post
    cy.visit('/sessions/new')
    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()

    cy.visit('/posts')
    cy.contains('New post').click()

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!')
    cy.get('#new-post-form').submit()

    cy.get('.posts').should('contain', 'Hello, world!')
  })

  it('can submit posts, when signed in, and view the newest first', () => {
    // submit a post
    cy.visit('/sessions/new')
    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()

    cy.visit('/posts')
    cy.contains('New post').click()

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!')
    cy.get('#new-post-form').submit()

    cy.get('.posts').should('contain', 'Hello, world!')

    cy.visit('/posts')
    cy.contains('New post').click()

    cy.get('#new-post-form').find('[type="text"]').type('Goodbye, world!')
    cy.get('#new-post-form').submit()
    cy.get('.posts').eq(0).should('contain.text', 'Goodbye, world!')
  })
})
