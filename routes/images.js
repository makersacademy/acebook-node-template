const express = require("express");
const router = express.Router();
const multer = require('multer');
const ImagesController = require("../controllers/images");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/'); // Set the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name to be unique
    }
  });
  

const upload = multer({ storage: storage });

router.get("/", ImagesController.Index);
router.post("/", upload.single('image'), ImagesController.Upload);


module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require('multer');
// const ImagesController = require("../controllers/images");
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: 'uploads', // Specify the folder in Cloudinary where the images will be stored
//     allowedFormats: ['jpg', 'png', 'jpeg'],
//     transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: Set desired image transformations
//   });

// const upload = multer({ storage: storage });

// router.get("/", ImagesController.Index);
// router.post("/", upload.single('image'), ImagesController.Upload);


// module.exports = router;