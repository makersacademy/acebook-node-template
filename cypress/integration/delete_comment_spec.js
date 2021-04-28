describe('Timeline', function() {
  beforeEach(async (done) => {
    await cy.task("db:drop:all");
    done();
  })
  it('can delete comment', function() {
    cy.visit('/')
    cy.get('input.fname').type('Delete Com')
    cy.get('input#pword').type('Delete')
    cy.get('.registration-form').submit();
    
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();
    cy.get('#new-comment-form').find('[type="text"]').type('Delete Comment');
    cy.get('#new-comment-form').submit();
    cy.contains('Delete').click();


    cy.get('.posts').should('not.contain', 'Delete Comment');
  });

  it('can only delete own comment', function() {
    cy.visit('/')
    cy.get('input.fname').type('Delete Com')
    cy.get('input#pword').type('Delete')
    cy.get('.registration-form').submit();
    
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('#new-comment-form').find('[type="text"]').type('My Comment');
    cy.get('#new-comment-form').submit();

    cy.get('#logoutbutton').submit();

    cy.get('input.fname').type('other_user')
    cy.get('input#pword').type('otheruser')
    cy.get('.registration-form').submit();

    cy.contains('Delete').click();

    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains('Bruh! You cant be deleting ppls comments like that!');
   })
  });
});