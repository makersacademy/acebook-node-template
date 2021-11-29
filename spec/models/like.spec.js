'use strict';
const mongoose = require('mongoose');
const Like = require('../../models/like');

require('../mongodb_helper');

describe('Like model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.likes.drop(function() {
          done();
      });
  });
  it('can save a like', function(done) {
    const like = new Like({ userID: '1F3A56', postID: '12345' });

    like.save(function(err) {
      expect(err).toBeNull();

      Like.find(function(err, likes) {
        expect(err).toBeNull();

        expect(likes[0]).toMatchObject({ userID: '1F3A56', postID: '12345' });
        done();
      });
    });
  });

});