var Post = require('../models/postsSchema');

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    joined: {
        type: Date,
        default: Date.now
    },
    posts: [Post]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
