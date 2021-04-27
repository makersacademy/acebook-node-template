describe('User profile', function() {
  before(async (done) => {
      await cy.task("db:drop");
      done();
  })

  beforeEach(() => {
      cy.signupAndLogin()
  });

  it('can view profile', function() {
      cy.visit('/posts');
      cy.contains('user1').click();

      cy.contains('user1');
      cy.contains('I have not written a bio yet');
  })
})