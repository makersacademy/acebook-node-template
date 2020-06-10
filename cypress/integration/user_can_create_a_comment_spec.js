describe('Newsfeed', function() {
    it('can view all posts with comments', function() {
      cy.visit('/signup');
      cy.get('#new-user-form').find('[id="firstName"]').type('Berty')
      cy.get('#new-user-form').find('[id="lastName"]').type('Button')
      cy.get('#new-user-form').find('[id="email"]').type('BB@example.com')
      cy.get('#new-user-form').find('[id="password"]').type('1234')
      cy.get('#new-user-form').submit();

      cy.get('#login-form').find('[id="email"]').type('BB@example.com')
      cy.get('#login-form').find('[id="password"]').type('1234');
      cy.get('#login-form').submit();

      console.log("In spec file before cy.task");


      // cy.task('myAsyncTask').then(function(result) {
        // do some more tests here now the async task has finished.
        // console.log("RESULT VVVVVV");
        // console.log(result);
        // console.log("RESULT ^^^^^^");
        // cy.get('#comment-form-#{bookmark.id}').find('[id="comment"]').type("This is a comment");
        // cy.get('#new-post-form').submit();

        // cy.get('#posts').should('contain', 'This is a comment')

      });
    });
  });
