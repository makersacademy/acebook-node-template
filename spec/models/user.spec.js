var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
    beforeEach(function(done) {
        mongoose.connection.collections.users.drop(function() {
            done();
        });
    });

    it('has a name, email and dob', () => {
        const user = new User({ name: "Terry Wogan", email: "terry@wogan.com", dob: "03/08/1938"});

        expect(user.name).toEqual("Terry Wogan");
        expect(user.email).toEqual("terry@wogan.com");
        expect(user.dob).toEqual("03/08/1938");
    });

});