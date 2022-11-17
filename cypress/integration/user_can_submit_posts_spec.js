describe('Timeline', () => {

  beforeEach(() => {
    // sign up
    cy.visit('/users/new')
    cy.get('#first_name').type('Someone')
    cy.get('#last_name').type('Example')
    cy.get('#DOB').type('1993-10-02')
    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()

    // sign in
    cy.visit('/sessions/new')
    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()

    })

  it('can submit a post and view it', () => {
    // submit a post
    cy.visit('/posts')
    cy.contains('New post').click()

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!')
    cy.get('#new-post-form').submit()

    cy.get('.posts').should('contain', 'Hello, world!')
  })


  it('can submit posts, when signed in, and view the newest first', () => {
    // submit a post
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

  it('can submit a post, view it with first name and last name', () => {
    // submit a post
    cy.visit('/posts')
    cy.contains('New post').click()

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!')
    cy.get('#new-post-form').submit()

    cy.get('.posts').should('contain', 'Someone Example')
  })
})
