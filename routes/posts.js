const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const axios = require('axios');

const YOUR_API_KEY = "eLyYwLxVEXe3Jzab51w6OoNKOXhG4byS";

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/:id/likes", PostsController.Like);
router.post("/:id/comments", PostsController.Comment);

router.post('/gif', async (req, res) => {
    const { searchQuery } = req.body;
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${YOUR_API_KEY}&limit=9`;
    
    try {
        const response = await axios.get(url);
        const { data } = response.data;
        res.render('./posts/new', { gifs: data });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
