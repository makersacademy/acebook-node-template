describe('Dashboard', function() {
    beforeEach(async (done) => {
      await cy.task("db:drop:all");
      done();
    })

it('can see only own posts', function() {
    cy.visit('/')
    cy.get('input.fname').type('First user')
    cy.get('input#pword').type('password1')
    cy.get('.registration-form').submit();
    
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('#logoutbutton').submit();

    cy.get('input.fname').type('other_user')
    cy.get('input#pword').type('otheruser')
    cy.get('.registration-form').submit();

    cy.contains('New post').click();
    cy.get('#new-post-form').find('[type="text"]').type('Hi world!');
    cy.get('#new-post-form').submit();

    cy.contains('Dashboard').click();

    cy.get('.cards').should('not.contain', 'Hello, world!');
    cy.get('.cards').should('contain', 'Hi world!');
  });
});