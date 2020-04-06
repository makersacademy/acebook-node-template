var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', () => {
  beforeEach((done) => {
      mongoose.connection.collections.users.drop(() => {
          done();
      });
  });
  it('has a user', () => {
    var user = new User({ username: 'derpygary'});
    expect(user.username).toEqual('derpygary');
  });

  it('has a password', () => {
    var user = new User({ password: 'qwerty'});
    expect(user.password).toEqual('derp');
  });

});
