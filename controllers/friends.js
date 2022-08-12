const Friend = require("../models/friend");

const FriendsController = {
    Add: (req, res) => {
        console.log("controller is working!");
        console.log(req.body);
        const friendship = new Friend({ requester: req.body, recipient: req.body, status: 0 })
        friendship.save((err) => {
            if (err) {
                throw err;
            }
        })
        res.status(201).redirect("/");
    }
}

module.exports = FriendsController;