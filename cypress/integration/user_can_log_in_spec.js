describe('Logging In - HTML Web Form', function () {
    // we can use these values to log in
    const username = 'jane.lane'
    const password = 'password123'

    context('HTML form submission', function () {
        beforeEach(function () {
          cy.visit('/login')
        })
    
        it('displays errors on login', function () {
          cy.get('input[name=username]').type('jane.lae')
          cy.get('input[name=password]').type('password123{enter}')
    
          cy.get('p.error')
          .should('be.visible')
          .and('contain', 'Username and/or password is incorrect')
    
          cy.url().should('include', '/login')
        })
    
        it('redirects to /dashboard on success', function () {
          cy.get('input[name=username]').type(username)
          cy.get('input[name=password]').type(password)
          cy.get('form').submit()
          
          cy.url().should('include', '/dashboard')
          cy.get('h1').should('contain', 'jane.lane')
    
        })
      })
    })