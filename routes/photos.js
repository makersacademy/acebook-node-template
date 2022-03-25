const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/user");

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


//load a photo to snaps
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

//load a photo to profile
router.post("/profilepic" , upload.single("myImage"), async (req, res) =>  {
  const userid = req.session.user._id
  const obj = {
      img: {
          data: fs.readFileSync(path.join("public/images/" + req.file.filename)),
          contentType: "image/png",
      }
  }
  const newImage = new ImageModel({
      image: obj.img,
      imgPath: `/images/${req.file.filename}`,
      imgName:  `${req.file.filename}`
  });
  await User.findOneAndUpdate({
    _id: userid},
  {image: newImage.imgPath}, {new:true},
  function(err) {
    if (err) {
      throw err;
    }
    console.log('Success')
  res.json()
  });
});


//load photos
router.get("/",  (req, res) => {
  ImageModel.find({}).exec(function (err, photos) {
   if(err) {
     throw err;
   }
   res.json({ photos: photos, user: req.session.user });
 })
},);

module.exports = router;