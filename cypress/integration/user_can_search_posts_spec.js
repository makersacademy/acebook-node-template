describe('Timeline', function() {
  before(async (done) => {
    await cy.task("db:drop");
    done();
  })

  beforeEach(() => {
    cy.signupAndLogin()
  });

  it('can search for a post', function() {
    cy.visit('/posts');
    cy.get('.new-post-link').click();

    cy.get('#new-post-form').find('[type="text"]').type('Happy new week!');
    cy.get('#new-post-form').submit();
    
    cy.get('#search-post-form').find('[type="text"]').type('Happy');
    cy.contains('Search').click();

    cy.contains('Happy new week!');
    cy.contains('Back to the Timeline').click();

    cy.url().should('eq', 'http://localhost:3030/posts');

  })
})