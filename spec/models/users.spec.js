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


    // it('updates the bio page for user', function(done) {
    //     var users = new Users({ fullname: 'Joe Bloggs', email: 'user@WP2M.com', username: 'usernameWP2M', password: 'password123', bio: 'This is your bio, please update. Click the edit button to do so.'});   
    //     users.save(function(err) { 
    //             expect(err).toBeNull(); 
            
    //         Users.find(function(user) {
    //             console.log(user);  
    //            user[0].bio = 'This is my bio, about my amazing self'
    //             users.save(function(err) {
    //                 expect(err).toBeNull(); 
    //              });
    //         });
    //     });
    //         // Users.find(function(err, updateBio){
    //         //     console.log(updateBio[0].bio);
    //         // expect(updateBio[0]._id).toBeDefined();
    //         // expect(updateBio[0].bio).toEqual('This is my bio, about my amazing self');
    //         // done();
    //         // });
    //         done();
    //     });

});
