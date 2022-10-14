var Comment = require("../../models/comment");

describe("Comment model", () => {
  it("has a message", () => {
    var comment = new Comment({ message: "some message" });
    expect(comment.message).toEqual("some message");
  });
  it("has a name", () => {
    var comment = new Comment({ name: "some name" });
    expect(comment.name).toEqual("some name");
  });
  it("has a createdAt", () => {
    var comment = new Comment({ createdAt: "some date" });
    expect(comment.createdAt).toEqual("some date");
  });
});
