const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes");

router.put("/new/:postId", LikesController.Create);
// router.put("/likes/delete/:username", LikesController.Delete);

module.exports = router;