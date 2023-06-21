const express = require("express");
const router = express.Router();
const isAuthenticated = require('../authMiddleware');
const PostsController = require("../controllers/posts");
const axios = require('axios');

const YOUR_API_KEY = "eLyYwLxVEXe3Jzab51w6OoNKOXhG4byS";

router.get("/", isAuthenticated, PostsController.Index);
router.post("/", isAuthenticated, PostsController.Create);
router.get("/new", isAuthenticated, PostsController.New);
router.post("/:id/likes", isAuthenticated, PostsController.Like);
router.post("/:id/comments", isAuthenticated, PostsController.Comment);
router.post("/:id/nemesis", isAuthenticated, PostsController.MakeNemesis);

router.post('/gif', async (req, res) => {
    const { searchQuery } = req.body;
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${YOUR_API_KEY}&limit=9`;
    
    try {
        const response = await axios.get(url);
        const { data } = response.data;
        res.render('./posts/new', { icon: req.session.user.icon, gifs: data });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

module.exports = router;