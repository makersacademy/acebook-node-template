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
    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });
    var upload = multer({ storage: storage });
    var obj = {
        name: req.body.name,
        
        link: path.join('uploads/' + req.file.filename)
        
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/images/all');
        }
    });
  }
}

module.exports = ImagesController;