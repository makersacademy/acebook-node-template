describe('Timeline', function() {

  beforeEach(() => {
    cy.signupAndLogin()
  });

  it('can search for a post', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Happy new week!');
    cy.get('#new-post-form').submit();
    
    cy.get('#search-post-form').find('[type="text"]').type('Happy!');
    cy.contains('Search').click();

    cy.contains('Happy new week!');
    cy.contains('Back to Homepage').click();

    cy.url().should('eq', 'http://localhost:3030/posts');

  })
})