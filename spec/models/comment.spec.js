const mongoose = require('mongoose');

require('../mongodb_helper');
const Comment = require('../../models/comment');

describe('Comment model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it('has a comment', () => {
    const comment = new Comment({ comment: 'test comment' });
    expect(comment.comment).toEqual('test comment');
  });

  it('has a default time', () => {
    const comment = new Comment({ comment: 'new comment' });
    const date = new Date().toLocaleDateString();

    expect(comment.timeCreated).toBeTruthy();
    expect(comment.timeCreated).toEqual(expect.stringContaining(date));
  });
});
