const express = require("express");
const router = express.Router();

const LikeController = require("../controllers/likes");

router.get("/posts", LikeController.Index);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const PostsController = require("../controllers/posts");

// router.get("/", PostsController.Index);
// router.post("/", PostsController.Create);
// router.get("/new", PostsController.New);

// module.exports = router;
