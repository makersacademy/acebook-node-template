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

var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Image', imageSchema);
