const mongoose = require("mongoose");

require("../mongodb_helper");
const Comment = require("../../models/comment");

describe("User model", () => {
    beforeEach((done) => {
      mongoose.connection.collections.comments.drop(() => {
        done();
      });
    });

    it("has a post_id", () => {
        const comment = new Comment({
            post_id: "63e38f8d190e0f6cef23cc0f",
            user_id: "63e4dada71de08c481ac30dd",
            message: "Message",
        });
        expect(comment.post_id).toEqual("63e38f8d190e0f6cef23cc0f");
    });

    it("has a user_id", () => {
        const comment = new Comment({
            post_id: "63e38f8d190e0f6cef23cc0f",
            user_id: "63e4dada71de08c481ac30dd",
            message: "Message",
        });
        expect(comment.user_id).toEqual("63e4dada71de08c481ac30dd");
    });

    it("has a message", () => {
        const comment = new Comment({
            post_id: "63e38f8d190e0f6cef23cc0f",
            user_id: "63e4dada71de08c481ac30dd",
            message: "Message",
        });
        expect(comment.message).toEqual("Message");
    });

    it("can save a comment", (done) => {
        const comment = new Comment({
            post_id: "63e38f8d190e0f6cef23cc0f",
            user_id: "63e4dada71de08c481ac30dd",
            message: "Message",
        });
    
        comment.save((err) => {
          expect(err).toBeNull();
    
          Comment.find((err, posts) => {
            expect(err).toBeNull();
    
            expect(posts[0]).toMatchObject({ post_id: "63e38f8d190e0f6cef23cc0f",
            user_id: "63e4dada71de08c481ac30dd",
            message: "Message", });
            done();
          });
        });
      });
});