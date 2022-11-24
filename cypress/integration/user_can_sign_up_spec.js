
function random(){
  return Math.random()
}

describe('Registration', () => {
  it('A user signs up with all inputs filled in and is redirected to sign in', () => {
    // sign up

    cy.visit('/users/new')
    cy.get('#submit').click()
    cy.url().should('include', '/users/new')

    cy.get('#first_name').type('Sarah')
    cy.get('#last_name').type('Smith')
    cy.get('#DOB').type('1981-11-06')

    cy.get('#email').type(random().toString() + '@example.com')
    cy.get('#password').type('pasSword!2')
    cy.get('#submit').click()
    // the user gets an error message


    cy.url().should('include', '/posts')
  })

})
