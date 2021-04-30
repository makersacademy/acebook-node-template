describe('session', function(){
  before(async (done) => {
    await cy.task("db:drop");
    done();
  })

  describe('logging into a session', function(){
    beforeEach(() => {
      cy.visit('/users/signup');
      cy.get('#sign-up-form').find('#username').type('user1');
      cy.get('#sign-up-form').find('#email').type('email@test.co.uk');
      cy.get('#sign-up-form').find('#password').type('test123');
      cy.get('#sign-up-form').submit();
    });

    it('reroutes to login page, when incorrect credentials', function(){
      cy.get('#log-in-form').find('#email').type('email@test.co.uk');
      cy.get('#log-in-form').find('#password').type('test12345');
      cy.get('#log-in-form').submit();

      cy.url().should('eq', 'http://localhost:3030/users/login');
    })

    it('allows them to login and see posts', function(){
      // cy.url().should('eq', 'http://localhost:3030/users/login');
      cy.visit('/users/login');
      cy.get('#log-in-form').find('#email').type('email@test.co.uk');
      cy.get('#log-in-form').find('#password').type('test123');
      cy.get('#log-in-form').submit();

      cy.url().should('eq', 'http://localhost:3030/posts');
    })

    it ('allows them to logout', function(){
      cy.visit('/users/login');
      cy.get('#log-in-form').find('#email').type('email@test.co.uk');
      cy.get('#log-in-form').find('#password').type('test123');
      cy.get('#log-in-form').submit();
      cy.visit('/posts')
      cy.contains('Log out').click();

      cy.url().should('eq', 'http://localhost:3030/users/login');
        
      cy.visit('/posts');
      cy.get('h1').not('contain', 'Timeline');

    });
    
  })

  describe('non-account users', function(){
    it('prevents non-account users accessing /posts', function(){
      cy.visit('/posts');
      cy.url().should('eq', 'http://localhost:3030/users/login');
    });

    it('prevents non-account users accessing /posts/new', function(){
      cy.visit('/posts/new');
      cy.url().should('eq', 'http://localhost:3030/users/login');
    });
  });

})