// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');
const Schema = require("mongoose").Schema;

// var imageSchema = new mongoose.Schema({
//     name: String,
//     desc: String,
//     img:
//     {
//         data: Buffer,
//         contentType: String
//     }
// });

const imageSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    desc: String,
    imgPath: String,
    profile: Boolean,
})

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Image', imageSchema);
