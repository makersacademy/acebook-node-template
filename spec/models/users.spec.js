var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/users');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
          done();
      });
  });

  it('has a user', function() {
    var user = new User({ name: 'John', email: 'john@gmail.com', password: 'Password123' });
    expect(user.name).toEqual('John');
    expect(user.email).toEqual('john@gmail.com');
    expect(user.password).toEqual('Password123');
  });

  it('can list all users', function(done) {
    User.find(function(err, users) {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it('can save a user', function(done) {
    var user = new User({ name: 'John', email: 'john@gmail.com', password: 'Password123' });
    user.save(function(err) {
      expect(err).toBeNull();

      User.find(function(err, users) {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({ name: 'John', email: 'john@gmail.com', password: 'Password123' });
        done();
      });
    });
  });

  it('can delete a user', function(done) {
    var user = new User({ name: 'John', email: 'john@gmail.com', password: 'Password123' });

    user.save(function(err) {
      expect(err).toBeNull();

      User.deleteOne(user,function(err, users) {
        expect(err).toBeNull();

        expect(users).toEqual({"deletedCount": 1, "n": 1, "ok": 1});
        done();
      });
    });
 });
});
