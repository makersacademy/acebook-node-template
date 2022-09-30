const Image = require("../models/image");
const fs = require('fs');
var path = require('path');
require('dotenv/config');


const ImagesController = {
  
  New: (req, res) => {
    Image.find({}, (err, images) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('./images/imagesPage', { images: images, signedIn: req.session.signedIn, });
        }
    });
  },
  Index: (req, res) => {
    Image.find({}, (err, images) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            console.log(images)
            res.render('./images/index', { images: images });
        }
    });
  },

  Create: (req, res, next) => {
    console.log("########### 4 ###########")
    var obj = {
        name: req.body.name,
        
        link: path.join('uploads/' + req.file.filename)
       
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("########### 5 ###########")
            item.save();
            next();
        }
    });
  }
}

module.exports = ImagesController;