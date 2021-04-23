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

  it('can update a post', function(done) {
    var post = new Post({message: 'some message '});

    post.save(function(err) {
      expect(err).toBeNull();

      Post.updateOne(function(err, post) {
        expect(err).toBeNull();

        expect(post).not.toContain({message: 'some message'});
        done();

      });
    });
  })
});


//   it('sorts posts in descending order', function(done) {
//     var post = new Post({message: 'Hello World!'});
//     var post2 = new Post({message: 'Goodbye World!'});

//     var posts = Post.find();

//     posts.sort('-createdAt')
//     posts.find(function(err, posts) {
//       if(err) {
//         throw err
//       }
//       expect(posts[0]).toEqual(post2);
//       expect(posts[1]).toEqual(post);
      
//     });
//     done(); 
//   });
// })

   
