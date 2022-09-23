// const imageSchema = require("../models/photo");
var imgModel = require('../models/photo');
var multer = require('multer');
const Photo = require("../models/photo");  

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
// var upload = multer({ storage: storage });



const PhotosController = {
  Index: (req, res) => {
    app.get('/images', (req, res) => {
      console.log(req)
      imgModel.find({}, (err, items) => {
          if (err) {
              console.log(err);
              res.status(500).send('An error occurred', err);
          }
          else {
              res.render('/photos/imagesPage', { items: items });
          }
      });
    });
  },
  
  New: (req, res) => {
    res.render("photos/imagesPage", {photos: photos});
  },

  Create: (req, res) => {
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Photo.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/');
        }
        res.status(201).redirect("/photos");
    });
  }
};

module.exports = PhotosController;

