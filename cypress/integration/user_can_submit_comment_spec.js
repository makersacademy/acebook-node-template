describe('Can submit Comments', function() {
  before(async (done) => {
    await cy.task("db:drop");
    done();
  })

  beforeEach(() => {
    cy.signupAndLogin()
  });

  it('can submit a comment and view it', function() {
      cy.visit('/posts');
      cy.get('.new-post-link').click();
      cy.get('#new-post-form').find('[type="text"]').type('Goodbye, world!');
      cy.get('#new-post-form').submit();

      cy.contains('Add Comment').click();
      cy.get('#new-comment-form').find('[type="text"]').type('Cool story bro!')
      cy.contains('Add Comment').click();
      
      cy.contains('Cool story bro!');
  })
});