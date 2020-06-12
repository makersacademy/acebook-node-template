var User = require('../../models/user.js');
var Post = require('../../models/post.js');

// describe('Newsfeed', function() {
//   it('can view all posts in chronological order', function() {
//     cy.task('emptyPosts');
//     cy.task('emptyUsers');
//     cy.task('insertUser', {firstName: 'Jimothy', lastName: 'Saladberg', email: 'jimothy@saladland.com', password: '12345', profilePicture: ""});
//     cy.task('insertUser', {firstName: 'Lomothy', lastName: 'Mockins', email: 'Lomothy.Tomins@example.com', password: '12345', profilePicture: ""});
//     cy.task('getUser', {firstName: 'Jimothy'})
//     .then(function(user) {
//       var fullName = user.firstName + ' ' + user.lastName;
//       cy.task('insertPost', {body: 'I met a lovely dog today', datePosted:'2020-06-03', name: fullName, userID: user._id.toString()} );
//     });
//     // // below should be replaced with login helper function
//     cy.visit('/');
//     cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
//     cy.get('#login-form').find('[id="password"]').type('12345')
//     cy.get('#login-form').submit();
//     cy.get('#posts').should('contain', 'I met a lovely dog today - by Jimothy Saladberg');
//     });
// });

describe('Newsfeed', function() {
  it('can view all posts in chronological order', function() {
    cy.task('emptyPosts');
    cy.task('emptyUsers');
    cy.task('insertUser', {firstName: 'Jimothy', lastName: 'Saladberg', email: 'jimothy@saladland.com', password: '12345', profilePicture: ""});
    cy.task('insertUser', {firstName: 'Lomothy', lastName: 'Mockins', email: 'Lomothy.Tomins@example.com', password: '12345', profilePicture: ""})
    .then(function(user) {
       return cy.task('getUser', {firstName: 'Jimothy'})
    })
    .then(function(user) {
      var fullName = user.firstName + ' ' + user.lastName;
      return cy.task('insertPost', {body: 'I met a lovely dog today', datePosted:'2020-06-03', name: fullName, userID: user._id.toString()} )
      .then(function(result) {
        cy.visit('/');
        cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
        cy.get('#login-form').find('[id="password"]').type('12345')
        cy.get('#login-form').submit();
        cy.get('#posts').should('contain', 'I met a lovely dog today - by Jimothy Saladberg');
        cy.wait(3000);
        });
      });
    });
        // // below should be replaced with login helper function
});
