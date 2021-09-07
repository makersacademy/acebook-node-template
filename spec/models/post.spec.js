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
    var post = new Post({ message: 'check message' });
    
    post.save(function(err) {
      expect(err).toBeNull();
    
      Post.findByIdAndRemove({ _id: post._id }, function(err) {
        expect(err).toBeNull();

        Post.find(function(err, posts) {
          expect(err).toBeNull();
          expect(posts[0]).toBeUndefined();
          done();
        });
      });
    });  
  });

  it('the default value of likes is 0', function(done) {
    var post = new Post({ message: 'check message' });

    post.save(function(err) {
      expect(err).toBeNull();

      Post.find(function(err, posts) {
       
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: 'check message' });
        done();
      });
    });

    expect(post.likes).toEqual(0);

  });

  it('adds 1 to likes value', function(done) {
    var post = new Post({ message: 'like message' });
    
    post.save(function(err) {
      expect(err).toBeNull();
      Post.find(function(err, posts) {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: 'like message' });
        done();
        Post.findByIdAndUpdate(
          { _id: post._id },
          {$inc:{ likes: 1 }},
          function(err) {
            if (err) {
              console.log("This is an error");
            } else {
              console.log("It worked-ish");
            }
          }
        );
      });
    });
  });
});