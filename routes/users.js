const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");


var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

router.get("/search", UsersController.Search);
router.get("/new", UsersController.New);
router.get("/:id", UsersController.Show);
router.post("/", UsersController.Create);
router.post("/upload", upload.single('image'), UsersController.Upload);

module.exports = router;
