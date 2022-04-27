const mongoose = require("mongoose");
const Post = require("../models/post");

const PostsController = {
    Index: (req, res) => {
        Post.find().populate(["author", "comments.author"]).exec((err, posts) => {
            if (err) {
                throw err;
            }
            res.render("posts/index", {posts: posts.reverse()});
        });
    }, New: (req, res) => {
        res.render("posts/new", {});
    }, Create: (req, res) => {

        const post = new Post({
            ...req.body, author: req.session.user._id, img: {
                contentType: req.file?.type, data: req.file?.buffer
            }, comments: []
        });

        post.save((err) => {
            if (err) {
                throw err;
            }
            res.status(201).redirect(`/posts/#${post._id}`);
        });
    },

    async Like(req, res) {
        if (req.session.user && req.body.post) {
            const user = req.session.user._id
            /**
             * - finds a post by id
             * - if the user's id is in the likes array, remove it
             * - otherwise, add it
             */
            await Post.findOneAndUpdate({_id: req.body.post}, [{
                $set: {
                    likes: {
                        $cond: [{$in: [user, "$likes"]}, {$setDifference: ["$likes", [user]]}, {$concatArrays: ["$likes", [user]]}]
                    }
                }
            }]).exec()
        }

    res.redirect(`/posts/#${req.body.post}`);
  },

  async Delete (req, res) {
    await Post.findOneAndDelete({
      _id: req.params.id, 
      author: req.session.user._id
    })
    res.status(200).send();
  },

  async DeleteComment (req, res) {
    await Post.findOneAndDelete({
        comment: req.body.comment,
        author: req.session.user._id
    })
    res.status(200).send();
  },

    async Comment(req, res) {
        await Post.findByIdAndUpdate(req.body.post, {
            $push: {
                comments: {
                    _id: new mongoose.Types.ObjectId(),
                    comment: req.body.comment,
                    author: req.session.user._id,
                    img: {
                        contentType: req.file?.type,
                        data: req.file?.buffer
                    },
                }
            },

        });
        res.redirect(`/posts/#${req.body.post}`);
    }

};

module.exports = PostsController;
