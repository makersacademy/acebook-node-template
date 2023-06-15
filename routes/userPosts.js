const express = require("express");
const router = express.Router();

const UserPostsController = require("../controllers/userPosts");

router.post("/", UserPostsController.Create); 

module.exports = router;