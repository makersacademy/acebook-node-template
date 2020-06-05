// var User = require('../../models/user.js');
// var Post = require('../../models/post.js');

describe('Newsfeed', function() {
  it('can view all posts in chronological order', function() {
    // cy.log(Post);
    //cy.log(User);
    // cy.log(Post.constructor.name);
    // var user = new User({firstName: "Jimothy", lastName: "Saladberg", email: 'jimothy@saladland.com', password: "123"});
    // user.save();
    // var newPost = new Post({body: 'I met a lovely dog today', datePosted:'2020-06-03', userID: user._id});
    // newPost.save();

    cy.visit('/newsfeed');
    cy.get('#posts').should('contain', 'I met a lovely dog today - by Jimothy Saladberg - Posted on 03/06/2020');
  });
});
