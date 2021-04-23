var mongoose = require('mongoose');

require('../mongodb_helper')
var Post = require('../../models/post');

describe('Post model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.posts.drop(function() {
          done();
      });
  });

  it('has a message', function() {
    var post = new Post({ message: 'some message' });
    expect(post.message).toEqual('some message');
  });

  it('can list all posts', function(done) {
    Post.find(function(err, posts) {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it('can save a post', function(done) {
    var post = new Post({ message: 'some message' });

    post.save(function(err) {
      expect(err).toBeNull();

      Post.find(function(err, posts) {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: 'some message' });
        done();
      });
    });
  });

  it('can delete a post', function(done) {
    var post = new Post({message: 'some message'});
    post.delete(function(err, posts) {
      expect(err).toBeNull();

      expect(posts).not.toContain('some message');
      done();
    });
  });

  it("sorts posts in descending order", function (done) {
    var post = new Post({ message: "Hello World!" });
    var post2 = new Post({ message: "Goodbye World!" }); // class Model

    post.save((err, postSaveResult) => {
      post2.save((err, post2SaveResult) => {
        var posts = Post.find()
        posts.sort("-createdAt");
        posts.find(function (err, result) {
          expect(err).toBeNull();

          expect(result[0].message).toEqual("Goodbye World!");
          expect(result[1].message).toEqual("Hello World!");

          done();
        });
      });
    });
  });
});
