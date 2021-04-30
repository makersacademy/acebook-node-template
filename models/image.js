var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ImageSchema = new mongoose.Schema({
    filename : {
        type : String,
        required: true
    },
    contentType : {
        type: String,
        required : true
    },
    imageBase64 : {
        type : String,
        required: true
    },
    posts: { type: Schema.Types.ObjectId, ref: "Post" },
    author : { type: Schema.Types.ObjectId, ref: "User"}
})
var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;