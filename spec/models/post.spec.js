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

  it('can save a comment to a post', function(done) {
    Post.create({ message: 'Testing comments' } , function (err) {
      expect(err).toBeNull();
      
      Post.findOneAndUpdate(
        { message: 'Testing comments' },
        { $push: { comments: 'Test comment for unit' } },
        {new:true},
        function(err, post) {
          expect(err).toBeNull();

          expect(post).toMatchObject({message: 'Testing comments' }, { comments: ['Test comment for unit'] });
          done();
        }
      )
    });
  });
  
});
