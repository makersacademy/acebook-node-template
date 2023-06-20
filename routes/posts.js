const express = require("express");
const router = express.Router();
const { parser } = require("../services/cloudinaryService");
const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", parser.single("image"), PostsController.Create);

module.exports = router;
