describe('Timeline', function () {
  beforeEach(async (done) => {
    await cy.task("db:drop:all");
    done();
  })
  it('can delete posts', function () {
    cy.visit('/')
    cy.get('input.fname').type('Delete')
    cy.get('input#pword').type('Delete')
    cy.get('.registration-form').submit();

    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Delete this post!');
    cy.get('#new-post-form').submit();
    cy.contains('Delete').click();

    cy.get('.posts').should('not.contain', 'Delete this post!');
  });

  it('can only delete own post', function () {
    cy.visit('/')
    cy.get('input.fname').type('Edit Com')
    cy.get('input#pword').type('Edit')
    cy.get('.registration-form').submit();

    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('#logoutbutton').submit();

    cy.get('input.fname').type('other_user')
    cy.get('input#pword').type('otheruser')
    cy.get('.registration-form').submit();


    cy.contains('Delete').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Bruh! You cant be deleting ppls posts like that!');
    })
  });
});