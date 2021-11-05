describe('Creating posts', function() {
  before(async(done) => {
        await cy.task("db:drop:all");
        done();
    }
  );

  it('stops non-logged in user from viewing posts', function() {
    cy.visit('/posts');
    cy.get('.login-form').should('exist');
  });

  it('can submit post without image and view it', function() {
    cy.visitSignUpPage();
    cy.signUpNewUser("Hermione Granger", "hermione");

    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Hello, world!');
  });

  it('can submit posts with image and view them', () => {
    cy.visitSignUpPage();
    cy.signUpNewUser("Hermione Granger", "hermione");

    cy.visit('/posts/new');
    cy.get('#new-post-form').find('[type="text"]').type('Panda');
    cy.get('#new-post-form').find('[type="file"]').attachFile('../panda.jpg');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Panda');
    cy.get('.posts').find('img.post-img').should('have.attr', 'src', '/images/post_imgs/panda.jpg');
  });
});
