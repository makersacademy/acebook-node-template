describe('Timeline', function () {
  beforeEach(async (done) => {
    await cy.task("db:drop:all");
    done();
  })
  it('can edit posts', function () {
    cy.visit('/')
    cy.get('input.fname').type('Edit')
    cy.get('input#pword').type('Edit')
    cy.get('.registration-form').submit();

    cy.visit('/posts');
    cy.contains('New post').click();
    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('.cards').should('contain', 'Hello, world!');

    cy.get('#edit-post-form').find('#message').type('Foxes');
    cy.get('#edit-post-form').submit();
    cy.get('.cards').should('contain', 'Foxes');
  });

  it('can only edit own post', function () {
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


    cy.get('#edit-post-form').type('Edited post');
    cy.get('#edit-post-form').submit();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Bruh! You cant be editing ppls posts like that!');
    })
  });
});