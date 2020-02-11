var mongoose = require('mongoose'); //requiring mongoose which links to the database

require('../mongodb_helper') //this requires file that sets up the database saying when it is test database and when dev database
var Post = require('../../models/post'); // requiring the database post

describe('Post model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.posts.drop(function() { //dropping all the posts ever created
          done();
      });
  });

  it('has a message', function() {
    var post = new Post({ message: 'some message' }); //creates new instance of post
    expect(post.message).toEqual('some message'); //mongodb syntax to say post.message
  });

  it('can list all posts', function(done) {
    Post.find(function(err, posts) {
      expect(err).toBeNull(); //it shouldn't return an error/it should work
      expect(posts).toEqual([]); //posts would be empty since drop above
      done();
    });
  });

  it('can save a post', function(done) {
    var post = new Post({ message: 'some message' });

    post.save(function(err) {
      expect(err).toBeNull(); //it should work

      Post.find(function(err, posts) {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: 'some message' }); //first value in the array to equal post added
        done();
      });
    });
  });

  // it('can save a comment on a post', function(done){
  //   var post = new Post ({ message: 'some message', comments: 'some comment' });
  //   post.save(function(err){
  //     expect(err).toBeNull();
  //
  //     Post.find(function(err,posts){
  //       expect(err).toBeNull();
  //
  //       const expected = ["some comment"]
  //       expect(posts[0]["comments"]).toEqual(expect.arrayContaining(expected));
  // });
  //       // const comment = Array.from(posts[0]["comments"])
  //       // const random = ("some comment").split()
  //       //
  //       // expect(comment).toContain( random);
  //     });
  //   });
  // });

});
