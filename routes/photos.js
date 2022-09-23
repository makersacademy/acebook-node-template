const express = require("express");
const router = express.Router();

const PhotosController = require("../controllers/photos");

router.get("/new", PhotosController.New);
router.post("/", PhotosController.Create);
router.get("/", PhotosController.Index);


module.exports = router;

