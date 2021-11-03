const mongoose = require('mongoose');

require('../mongodb_helper');
const User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
          done();
      });
  });

  it('has a user', function() {
    let user = new User({ 
      name: 'Harry Potter', 
      email: 'harry@example.com', 
      password: 'snitch' 
    });
    expect(user.name).toEqual('Harry Potter');
    expect(user.email).toEqual('harry@example.com');
    expect(user.password).toEqual('snitch');
  });

  // it('can list all posts', function(done) {
  //   Post.find(function(err, posts) {
  //     expect(err).toBeNull();
  //     expect(posts).toEqual([]);
  //     done();
  //   });
  // });

  // it('can save a post', function(done) {
  //   var post = new Post({ message: 'some message' });

  //   post.save(function(err) {
  //     expect(err).toBeNull();

  //     Post.find(function(err, posts) {
  //       expect(err).toBeNull();

  //       expect(posts[0]).toMatchObject({ message: 'some message' });
  //       done();
  //     });
  //   });
  // });
});
