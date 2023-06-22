const express = require("express");
const router = express.Router();
const isAuthenticated = require('../authMiddleware');
const validateCommentLength = require('../functions/validateCommentLength')
const PostsController = require("../controllers/posts");
const axios = require('axios');

const YOUR_API_KEY = "eLyYwLxVEXe3Jzab51w6OoNKOXhG4byS";

router.get("/", isAuthenticated, PostsController.Index);
router.post("/", isAuthenticated, PostsController.Create);
router.get("/new", isAuthenticated, PostsController.New);
router.post("/:id/likes", isAuthenticated, PostsController.Like);
router.post("/:id/comments", isAuthenticated, PostsController.Comment);
router.post("/:id/nemesis", isAuthenticated, PostsController.MakeNemesis);


const querystring = require('querystring');

router.post('/gif', async (req, res) => {
    const { searchQuery } = req.body;
    const message = req.body.prevMessage;
    console.log(message) // Get the current value of the message input field
    const queryParams = { // Construct an object with the query parameters
        q: searchQuery,
        api_key: YOUR_API_KEY,
        limit: 9,
        message: message, // Append the message value as a query parameter
    };
    const url = `https://api.giphy.com/v1/gifs/search?${querystring.stringify(queryParams)}`; // Convert the object to a query string and append it to the URL

    try {
        const response = await axios.get(url);
        const { data } = response.data;
        if (data.length === 0) {
        res.render('./posts/new', { icon: req.session.user.icon, noGifFound: true, message: message }); // Pass the value of the message input field to the template
        } else {
        res.render('./posts/new', { icon: req.session.user.icon, gifs: data, message: message }); // Pass the value of the message input field to the template
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


module.exports = router;