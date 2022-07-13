/**
 * @jest-environment jsdom
 */

const PostIndexView = require("../../public/javascripts/postIndexView");

describe(PostIndexView,() => {
  it("adds a post",() => {
    const posts = [{
      "__v": 0,
      "_id": "62cdc61cf5e8f93159b9c457",
      "message": "some message",
    }]
    view = new PostIndexView(posts);
    view.displayPosts();
    expect(document.querySelectorAll('div.post').length).toEqual(1);
    expect(document.querySelectorAll('div.post > .delete-button').length).toEqual(1);
  })
})
