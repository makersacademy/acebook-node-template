var mongoose = require('mongoose');

require('../mongodb_helper')
var Post = require('../../models/post');

describe("Post model", function () {
	beforeEach(function (done) {
		mongoose.connection.collections.posts.drop(function () {
			done();
		});
	});

	it("has a message", function () {
		var post = new Post({ message: "some message" });
		expect(post.message).toEqual("some message");
	});

	it("can list all posts", function (done) {
		Post.find(function (err, posts) {
			expect(err).toBeNull();
			expect(posts).toEqual([]);
			done();
		});
	});

	it("can save a post", function (done) {
		var post = new Post({ message: "some message" });

		post.save(function (err) {
			expect(err).toBeNull();

			Post.find(function (err, posts) {
				expect(err).toBeNull();

				expect(posts[0]).toMatchObject({ message: "some message" });
				done();
			});
		});
	});

	it("can delete a post", function (done) {
		var post = new Post({ message: "some message" });
		post.delete(function (err, posts) {
			expect(err).toBeNull();

			expect(posts).not.toContain("some message");
			done();
		});
	});

	it("can update a post", function (done) {
		var post = new Post({ message: "some message " });

		post.save(function (err) {
			expect(err).toBeNull();

			Post.updateOne(function (err, post) {
				expect(err).toBeNull();

				expect(post).not.toContain({ message: "some message" });
				done();
			});
		});
	});

	it("sorts posts in descending order", function (done) {
		var post = new Post({ message: "Hello World!" });
		var post2 = new Post({ message: "Goodbye World!" }); // class Model

		post.save(() => {
			post2.save(() => {
				var posts = Post.find();
				posts.sort("-createdAt");
				posts.find(function (err, result) {
					expect(err).toBeNull();

					expect(result[0].message).toEqual("Goodbye World!");
					expect(result[1].message).toEqual("Hello World!");

					done();
				});
			});
		});
	});

	describe("PostsSearch", () => {
		describe("when one post matches search text", () => {
			beforeEach(() => {
				Post.find = jest.fn(() => [
					{
						_id: 1,
						message: "Test Message",
						createdAt:"2021-04-24T08:50:43.111+00:00",
					},
				]);

				it("should return 1 post", () => {
					const posts = Post.find("Test");
					expect(posts.length).toBe(1);
				});

				it("should return 1 post", () => {
					const posts = Post.find("Test");
					expect(posts[0].message.toBe("Test book 2009"));
				});
			});
		});
	});
  
  describe('zero posts match the search ', () => {
    beforeEach(() => {
      Post.find = jest.fn(() => [
        {
          _id: 1,
          title: 'Test Message 2'
        }
      ]);
    });

    it('should return 0 posts', () => {
      const posts = Post.find('Peter');
      expect(posts).not.toContain("Peter");
    });
  });
});




   
