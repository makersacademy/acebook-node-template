describe('Can submit Comments', function() {
  // before(async (done) => {
  //   await cy.task("db:drop");
  //   done();
  // })

  beforeEach(() => {
    cy.signupAndLogin()
  });

  it('can submit a coment and view it', function() {
      cy.visit('/posts');
      // will need to add a comment here so that there is at least a post to add a comment to 
      cy.contains('Add Comment').click();
      cy.get('#new-comment-form').find('[type="text"]').type('Cool story bro!')
      cy.contains('Add Comment').click();
      
      cy.get('.comments').should('contain', 'Cool story bro!');
  })
});