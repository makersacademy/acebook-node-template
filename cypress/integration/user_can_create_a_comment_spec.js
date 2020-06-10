describe('Newsfeed', function() {
  it('can view all posts with comments', function() {
    cy.visit('/signup');
    cy.task("emptyUsers")
    cy.task('emptyPosts');
    cy.task('insertUser', {firstName: 'Lomothy', lastName: 'Mockins', email: 'Lomothy.Tomins@example.com', password: '12345'});
    
    cy.task('getUser', {firstName: 'Lomothy'})
    .then(function(user) {
      var fullName = user.firstName + ' ' + user.lastName;
      cy.task('insertPost', {body: 'I met a lovely dog today', datePosted:'2020-06-03', name: fullName, userID: user._id.toString(), 
      comments: [{body: "Amazing!", timePosted: "2020-06-04", commentUserName: fullName, commentUserID: user._id.toString()}]} ); 
    });

    cy.get('#comment-form-')

    cy.get('.commentBox').should('contain', 'Amazing!');

  });
});
