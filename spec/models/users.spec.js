var mongoose = require('mongoose');

require('../mongodb_helper')
var Users = require('../../models/users');

describe('Users model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
          done();
      });
  });


  it('users able to sign up with credentials', function(done) {
    var users = new Users({ fullname: 'Joe Bloggs', email: 'user@WP2M.com', username: 'usernameWP2M', password: 'password123' });

    expect(users.fullname).toEqual('Joe Bloggs');
    expect(users.username).toEqual('usernameWP2M');
    expect(users.email).toEqual('user@WP2M.com');
    expect(users.password).toEqual('password123');
    done();
  });


  it('check if users has credentials in database', function(done) {
        var users = new Users({ fullname: 'Joe Bloggs', email: 'user@WP2M.com', username: 'usernameWP2M', password: 'password123' });
            users.save(function(err) {
                expect(err).toBeNull();

                Users.find(function(err, users){
                expect(users[0]).toMatchObject({ fullname: 'Joe Bloggs', email: 'user@WP2M.com', username: 'usernameWP2M', password: 'password123' });
                done();
            });
        });
    });


    it('create & updates the bio page for user', function(done) {
        var users = new Users({ fullname: 'Joe Bloggs', email: 'user@WP2M.com', username: 'usernameWP2M', password: 'password123', bio: 'This is your bio, please update. Click the edit button to do so.'});
            users.save(function(err) {
            expect(err).toBeNull();

            var updateBio = new Users({ id: users._id, bio: 'This is my bio, about my amazing self' })
                updateBio.save(function(err) {
                expect(err).toBeNull();

                Users.find(function(err, updateBio){
                expect(updateBio.id).toEqual(users._id);
                expect(updateBio.bio).toEqual('This is my bio, about my amazing self');
                done();
                });
            });
        });
    });

});
