const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Like', LikeSchema);