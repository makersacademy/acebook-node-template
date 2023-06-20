const express = require("express");
const router = express.Router();
const multer = require("multer");
// const storage = require('../ao')
const path = require("path");

const PostsController = require("../controllers/posts");
const CommentController = require("../controllers/comments");

const storage = multer.diskStorage({
	destination: "/tmp/my-uploads", // Specify the destination folder where uploaded files will be stored
	filename: (req, file, cb) => {
		// Generate a unique filename for the uploaded file (e.g., using a timestamp or UUID)
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const fileExtension = path.extname(file.originalname);
		const fileName = file.fieldname + "-" + uniqueSuffix + fileExtension;
		cb(null, fileName);
	},
});

const upload = multer({ storage: storage });

router.get("/", PostsController.Index);
// router.post("/:postId/likes", PostsController.Likes);
router.post("/:postId/like", PostsController.likePost);
// router.post("/", PostsController.Create);
router.post("/", upload.single("image"), PostsController.Create);
router.get("/:postId/image", PostsController.getImage);

router.get("/new", PostsController.New);
router.get("/:postId", PostsController.Show);
router.post("/:postId/comments", CommentController.CreateComment);

module.exports = router;
