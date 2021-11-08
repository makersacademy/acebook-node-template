describe('Creating posts', function () {
  beforeEach(async done => {
    await cy.task('db:drop:all');
    done();
  });

  // eslint-disable-next-line cypress/no-async-tests
  it('allows a user to like a post', function () {
    cy.visitSignUpPage();
    cy.signUpNewUser('Barry Scott', 'example');

    cy.makeTestPostWithoutImage();

    cy.contains('Barry Scott').get('.like-button').click();
    cy.reload();
    cy.contains('Barry Scott').get('.like-counter').should('contain', '1');
  });

  it('allows multiple users to like a post', function () {
    cy.visitSignUpPage();
    cy.signUpNewUser('Barry Scott', 'example');

    cy.makeTestPostWithoutImage();

    cy.contains('Barry Scott').get('.like-button').click();

    cy.logOutUser();
    cy.visitSignUpPage();
    cy.signUpNewUser('John Wick', 'pewpew');

    cy.contains('Barry Scott').get('.like-counter').should('contain', '1');

    cy.contains('Barry Scott').get('.like-button').click();
    cy.contains('Barry Scott').get('.like-counter').should('contain', '2');
  });

  it('allows a user to unlike a post', function () {
    cy.visitSignUpPage();
    cy.signUpNewUser('Barry Scott', 'example');

    cy.makeTestPostWithoutImage();

    cy.contains('Barry Scott').get('.like-button').click();
    cy.reload();
    cy.contains('Barry Scott').get('.like-counter').should('contain', '1');

    cy.contains('Barry Scott').get('.like-button').click();
    cy.reload();
    cy.contains('Barry Scott').get('.like-counter').should('contain', '0');
  });
});
