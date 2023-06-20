const express = require("express");
const router = express.Router();

const UserPostsController = require("../controllers/userPosts");

router.post("/", UserPostsController.Create); 
router.get("/:username/posts/:postId/edit", UserPostsController.EditPost); 
router.post("/:username/posts/:postId/edit", UserPostsController.UpdatePost);


module.exports = router;