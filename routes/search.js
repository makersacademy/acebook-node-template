const express = require("express");
const router = express.Router();

const SearchController = require("../controllers/search");

router.get('/search', SearchController.Index, () => {
  console.log("working")
})
router.post('/search', SearchController.Index, () => {
  console.log("post request route")
})

module.exports = router;