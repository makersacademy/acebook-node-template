describe('Timeline', function() {
  beforeEach(() => {
    cy.visit('/users/signup');
    cy.get('#sign-up-form').find('#email').type('email@test.co.uk');
    cy.get('#sign-up-form').find('#password').type('test123');
    cy.get('#sign-up-form').submit();
    cy.contains('Log in').click();
    cy.get('#log-in-form').find('#email').type('email@test.co.uk');
    cy.get('#log-in-form').find('#password').type('test123');
    cy.get('#log-in-form').submit();
  });

  it('can search for a post', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Happy new week!');
    cy.get('#new-post-form').submit();
    
    cy.get('#search-post-form').find('[type="text"]').type('Happy!');
    cy.get('#search-post-form').submit();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/posts/search')
    })
    cy.get('.search').should('contain', 'Happy new week!');
  })
})