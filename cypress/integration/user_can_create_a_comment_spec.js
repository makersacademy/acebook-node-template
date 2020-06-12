describe('Newsfeed', function() {
  it('can view all posts with comments', function() {
    cy.task("emptyUsers")
    cy.task('emptyPosts');
    cy.task('insertUser', {firstName: 'Lomothy', lastName: 'Mockins', email: 'Lomothy.Tomins@example.com', password: '12345', profilePicture: ""});

    cy.task('getUser', {firstName: 'Lomothy'})
    .then(function(user) {
      var fullName = user.firstName + ' ' + user.lastName;
      cy.task('insertPost', {body: 'I met a lovely dog today', datePosted:'2020-06-03', name: fullName, userID: user._id.toString(),
      comments: [{body: "Amazing!", timePosted: "2020-06-04", commentUserName: fullName, commentUserID: user._id.toString()}]} );
      // task to get post and then comment id --> then do your tests in here
      cy.task('getPost', {body: 'I met a lovely dog today'})
      .then(function(post) {

        cy.visit('/');
        cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
        cy.get('#login-form').find('[id="password"]').type('12345')
        cy.get('#login-form').submit();

        cy.get(`#comment-form-${post._id}`).find('[id=new-comment]').type("This is a new comment")
        cy.get(`#comment-form-${post._id}`).submit();
        cy.get('.commentBox').should('contain', 'This is a new comment');

      })
    });



  });
});
