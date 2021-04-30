describe('Submit Posts', function() {
  before(async (done) => {
    await cy.task("db:drop");
    done();
  })

  beforeEach(() => {
    cy.signupAndLogin()
  });

  it('can submit posts and view them', function() {
    cy.visit('/posts');
    cy.get('.new-post-link').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hi!');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Hi!')
  });
});
