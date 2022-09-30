const express = require("express");
const ImagesController = require("../controllers/images");
const router = express.Router();
const Image = require ('../models/image')
const PostsController = require("../controllers/posts");

const hasImage = (req, res, next) => {
  if (req.body.image) {
    console.log(req.file);
    console.log("########### 1 ###########")
    ImagesController.Create(req, res)
  } else {
    next();
  }
}

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});
var upload = multer({ storage: storage });

router.get("/", PostsController.Index);
router.post("/", upload.single('image'), hasImage, PostsController.Create);
router.post("/:postId/like", PostsController.Like);
router.get("/new", PostsController.New);
router.get("/:postId", PostsController.PostId);
router.delete("/:postId/delete", PostsController.Destroy);

module.exports = router;
