const mongoose = require('mongoose');

require('../mongodb_helper');
const Post = require('../../models/post');

describe('Post model', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.posts.drop(function() {
      done();
    });
  });

  it('has a message', function() {
    const post = new Post({message: 'some message'});
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
    const post = new Post({message: 'some message'});

    post.save(function(err) {
      expect(err).toBeNull();

      Post.find(function(err, posts) {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({message: 'some message'});
        done();
      });
    });
  });


  it('can add a like', function(done) {
    const post = new Post({message: 'some message'});

    post.save(function(err) {
      expect(err).toBeNull();

      Post.updateOne(
          {'message': 'some message'},
          {$set: {'likes': '1'}},
          function(err) {
            expect(err).toBeNull();

        Post.find(function(err, posts) {
          expect(err).toBeNull();

          expect(posts[0]).toMatchObject({
            message: 'some message'});
          done();
        });
      });
    });
  });

  it('can delete a post', function(done) {
    const post = new Post({message: 'some message'});

    post.save(function(err) {
      expect(err).toBeNull();

      post.remove({_id: post.id}, function(err) {
        expect(err).toBeNull();

        Post.find(function(err, posts) {
          expect(err).toBeNull();

          expect(posts.length).toEqual(0);
          done();
        });
      });
    });
  });

  it('can edit a post', function(done) {
    const post = new Post({message: 'some message'});

    post.save(function(err) {
      expect(err).toBeNull();

      Post.updateOne(
          {'message': 'some message'},
          {$set: {'message': 'this is a changed message'}},
          function(err) {
            expect(err).toBeNull();

            Post.find(function(err, posts) {
              expect(err).toBeNull();

              expect(posts[0]).toMatchObject({
                message: 'this is a changed message'});
              done();
            });
          });
    });
  });
});
