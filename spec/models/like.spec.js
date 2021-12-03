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
  it('can count the number of likes per post', function(done) {
    const like1 = new Like({ userID: '1F3A56', postID: '12345' });
    const like2 = new Like({ userID: '2F3A56', postID: '12345' });
    const like3 = new Like({ userID: '2F3A56', postID: '22345' });

    like1.save(function(err) {
      expect(err).toBeNull();
      like2.save(function(err) {
        expect(err).toBeNull();
        like3.save(function(err) {
          expect(err).toBeNull();
          Like.find(function(err, likes) {
            expect(err).toBeNull();
            expect(likes[0]).toMatchObject({ userID: '1F3A56', postID: '12345' });
            Like.countAllLikes( (err, count) => {
              expect(err).toBeNull();
              const expectedArray = [ { _id: '22345', count: 1 } , { _id: '12345', count: 2 }]
              expect(count).toEqual(expect.arrayContaining(expectedArray))
              done()
            });
          });
        });
      });
    });
  });
  it('can list all likes from the a User', function(done) { 
    
    const like1 = new Like({ userID: '1F3A56', postID: '12345' });
    const like2 = new Like({ userID: '2F3A56', postID: '12345' });
    const like3 = new Like({ userID: '2F3A56', postID: '22345' });

    like1.save(function(err) {
      expect(err).toBeNull();
      like2.save(function(err) {
        expect(err).toBeNull();
        like3.save(function(err) {
          expect(err).toBeNull();
          Like.userLiked( '2F3A56',(err, postIDs ) => {
            expect(err).toBeNull();
            expect(postIDs[0].postID).toEqual('12345')
            expect(postIDs[1].postID).toEqual('22345')
            done()
          });
        });
      });
    });
  });
});




