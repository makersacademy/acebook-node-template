var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema(
	{
		author: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	message: String,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    images: [
			{
				url: String,
				filename: String,
			},
		],
	
	}, {
		timestamps: { createdAt: true, updatedAt: true },
	}, 
);


PostSchema.index({'$**': 'text'});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
