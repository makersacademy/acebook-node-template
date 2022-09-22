const express = require("express");
const router = express.Router();
const multer = require('multer');

const UsersController = require("../controllers/users");

// multer code

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('hello!');
    console.log(file);
      cb(null, './public/images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

 const upload = multer({ storage: storage });

//end of multer code



router.get("/new", upload.single('image'), UsersController.New);
router.post("/", upload.single('image'), UsersController.Create);

module.exports = router;
