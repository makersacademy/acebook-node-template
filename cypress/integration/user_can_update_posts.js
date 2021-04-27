describe('Update Posts', () => {
  before(async (done) => {
    await cy.task("db:drop");
    done();
  })

  beforeEach(() => {
    cy.signupAndLogin()
  });

  it('can submit posts and view them', function () {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('What is up!');
    cy.get('#new-post-form').submit();

    cy.contains('Edit').click();

    cy.get('#update-post-form').find('[type="text"]').type('Goodbye, world!');
    cy.get('#update-post-form').submit();
    cy.get('.posts').should('not.contain', 'What is up!');
  })
})


