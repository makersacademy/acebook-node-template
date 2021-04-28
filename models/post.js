var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema(
	{
		images: [
			{
				url: String,
				filename: String,
			},
		],
		message: {type: String, required: true},
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
	}, {
		timestamps: { createdAt: true, updatedAt: false}
	});

PostSchema.index({'$**': 'text'});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
