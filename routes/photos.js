const express = require("express");
const router = express.Router();

const PhotosController = require("../controllers/photos");

router.get("/images", PhotosController.Index);
router.get("/new", PhotosController.New);
router.post("/images/new", PhotosController.Create);

module.exports = router;

