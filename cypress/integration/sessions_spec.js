describe('session', function(){
  describe('logging into a session', function(){
    beforeEach(() => {
      cy.visit('/users/signup');
      cy.get('#sign-up-form').find('#email').type('email@test.co.uk');
      cy.get('#sign-up-form').find('#password').type('test123');
      cy.get('#sign-up-form').submit();
    });

    it('allows them to login and see posts', function(){
      cy.contains('Log in').click();

      cy.url().should('eq', 'http://localhost:3030/users/login');

      cy.get('#log-in-form').find('#email').type('email@test.co.uk');
      cy.get('#log-in-form').find('#password').type('test123');
      cy.get('#log-in-form').submit();

      cy.url().should('eq', 'http://localhost:3030/posts');
    })
  })

  // describe('non-account users', function(){
  //   it('prevents non-account users accessing /posts', function(){
  //     cy.visit('/posts');
  //     cy.get('.title').should('contain', 'Acebook');
  //   });
  // })
})