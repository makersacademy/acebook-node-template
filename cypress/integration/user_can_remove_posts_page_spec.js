var mongoose = require('mongoose');

// require('../mongodb_helper')
// var Post = require('../../models/post');


describe('Timeline', function() {

  beforeEach(function(done) {
      mongoose.connection.collections.posts.drop(function() {
          done();
      });
  });

  it('can remove posts and see there changes', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.contains('Delete').click();
   

    cy.get('.posts').should('not.contain', 'Hello, world!');  
  });
});