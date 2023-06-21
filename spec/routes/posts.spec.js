const mongoose = require("mongoose");

require("../mongodb_helper");
const PostController = require("../../controllers/posts");

describe("Posts controller", () => {
    beforeEach((done) => {
        mongoose.connection.collections.posts.drop(() => {
        done();
        });
    });

    it("should return an error if user posts a comment longer than 114 characters", (done) => {
        const req = {
            session: {
                user: {
                firstName: 'John',
                lastName: 'Doe',
                icon: ";)"
                },
            },
            body: {
                comment: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
            }
        };
        const res = {
            status: (code) => {
                expect(code).toEqual(400);
                return {
                render: (view, options) => {
                    expect(view).toEqual('posts/index');
                    done();
                }
                };
            }
        };

        PostController.Comment(req, res);
    })
})