var mongoose = require('mongoose');
const images = require('./image');
const Schema = mongoose.Schema;


var PostSchema = new mongoose.Schema(
	{
		images: [
			{
				url: String,
				filename: String,
			},
		],
		message: String,
	}, {
		timestamps: { createdAt: true, updatedAt: false}
	});

PostSchema.index({'$**': 'text'});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
