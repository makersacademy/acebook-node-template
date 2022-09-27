var multer = require('multer');
const Image = require("../models/photo");
var upload = multer({ storage: storage });
var imgModel = require('../models/photo');  

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});



const PhotosController = {
  Index: (req, res) => {
      imgModel.find({}, (err, items) => {
          if (err) {
              console.log(err);
              res.status(500).send('An error occurred', err);
              console.log('we are here 1')
          }
          else {
            console.log('we are here 1')
              res.render('/photos/imagesPage', { items: items });
          }
      });
    },
  
  New: (req, res) => {
    console.log('2')
    res.render("photos/imagesPage.ejs");
  },

  Create: (req, res) => {
    console.log('we are here 3')
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log('we are here 4')
            console.log(err);
        }
        else {
            console.log('we are here 4.5')
            // item.save();
            res.redirect('/');
        }
    });
  }
};

module.exports = PhotosController;

