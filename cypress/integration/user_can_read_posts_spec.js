// var User = require('../../models/user.js');
// var Post = require('../../models/post.js');

describe('Newsfeed', function() {
  it('can view all posts in chronological order', function() { 
    cy.task('emptyDatabase');
    // cy.task('insertUser', {firstName: 'Jimothy', lastName: 'Saladberg', email: 'jimothy@saladland.com', password: '12345'});
    // var user = cy.task('getUser', {firstName: 'Jimothy'})

    // cy.task('consoleLog', user);
    // cy.task('consoleLog', user._id);

    // cy.task('insertPost', {body: 'I met a lovely dog today', datePosted:'2020-06-03', userID: user._id.toString()} ); 

    // cy.task('insertUser', {firstName: 'Lomothy', lastName: 'Mockins', email: 'Lomothy.Tomins@example.com', password: '12345'});
    
    // // below should be replaced with login helper function
    // cy.visit('/');
    // cy.get('#login-form').find('[id="email"]').type('Lomothy.Tomins@example.com')
    // cy.get('#login-form').find('[id="password"]').type('12345')
    // cy.get('#login-form').submit();  
    
    cy.get('#posts').should('contain', 'I met a lovely dog today - by Jimothy Saladberg - Posted on 03/06/2020');
  });
});
