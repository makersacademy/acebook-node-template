const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const PhotosController = require("../controllers/photos");

//running directly from app to test
const ImageModel = require("../models/image");
router.post("/" , upload.single("myImage"), (req, res) =>  {
  const obj = {
      img: {
          data: fs.readFileSync(path.join("public/images/" + req.file.filename)),
          contentType: "image/png"
      }
  }
  const newImage = new ImageModel({
      image: obj.img,
      imgPath: `/images/${req.file.filename}`,
      imgName:  `${req.file.filename}`
  });
   newImage.save( (err) =>  {
 err ? console.log(err) :  res.redirect("/photos");
  });
});

//load photos
router.get("/",  (req, res) => {
  ImageModel.find({}).exec(function (err, photos) {
   if(err) {
     throw err;
   }
   res.render("photos", { photos: photos, user: req.session.user });
 })
},);

module.exports = router;