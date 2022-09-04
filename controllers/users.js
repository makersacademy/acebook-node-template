const User = require("../models/user");
const Friend = require("../models/friend");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body } = require("express-validator");
const Image = require("../models/image");
const Post = require("../models/post");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const UsersController = {
  Profile: async (req, res) => {
    try {
      const profile_user = await User.findOne({
        username: req.params.username,
      });
      const user = req.session.user;
      const allFriendsObject = await Friend.find({
        $or: [
          { recipient: profile_user.id, status: 1 },
          { requester: profile_user.id, status: 1 },
        ],
      });
      const friendsObject = allFriendsObject
        .sort((a, b) => a.date - b.date)
        .slice(0, 6);

      // Gets all current Friends
      const friends = await Promise.all(
        friendsObject.map(async (friendObject) => {
          if (friendObject.recipient.valueOf() == profile_user._id.valueOf()) {
            const user = await User.findById(friendObject.requester);
            const image = await Image.findOne({ user: user._id });
            return { user: user, picture: image };
          } else {
            const user = await User.findById(friendObject.recipient);
            const image = await Image.findOne({ user: user._id });
            return { user: user, picture: image };
          }
        })
      );
      const postObjects = await Post.find({ userId: profile_user.id });

      const postsToDisplay = await Promise.all(
        postObjects
          .sort(async (a, b) => b.date - a.date)
          .map((post) => {
            const dateFormatted = `${post.date.getHours()}:${post.date.getMinutes()}, ${post.date.toDateString()}`;
            return { content: post.content, date: dateFormatted };
          })
      );

      const pageOwnerBool = profile_user.username == user.username;

      // we are friends - tbc need to test with the button
      const friendsBool = await Friend.find({
        status: "1",
        $or: [
          { requester: profile_user.id, recipient: user._id },
          { requester: user._id, recipient: profile_user.id },
        ],
      });
      // there is a request but we are not friends. Either of use could have sent the request

      // there is a request. I have sent the request
      const myRequestBool = await Friend.find({
        status: "0",
        requester: user._id,
        recipient: profile_user.id,
      });

      // there is a request. They have sent the request
      const theirRequestBool = await Friend.find({
        status: "0",
        requester: profile_user.id,
        recipient: user._id,
      });

      // Find by page username
      const profile_pic = await Image.findOne({ user: profile_user.id });

      res.render("users/profile", {
        profile_pic: profile_pic,
        user: profile_user,
        session: req.session,
        pageOwnerBool: pageOwnerBool,
        friends: friends,
        posts: postsToDisplay,
        friendsBool: friendsBool,
        myRequestBool: myRequestBool,
        theirRequestBool: theirRequestBool,
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(201).redirect("../../sessions/new");
    }
  },

  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    const errors = validationResult(req);
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, saltRounds);
    if (!errors.isEmpty()) {
      res.render("users/new", { errors: errors.array() });
      return;
    }

    // Need to set default profile picture
    const defaultImage = path.join(
      path.resolve(__dirname, "..") + "/uploads/" + "image-1660819625599"
    );
    const username = user.username;
    try {
      await user.save();
      // Finding user id so I can set default picture to user
      const users = await User.find({ username: username });

      const image = new Image({
        user: users[0].id,
        img: {
          data: fs.readFileSync(defaultImage, "base64"),
          contentType: "image/png",
        },
      });
      await image.save();
      res.status(201).redirect("/posts");
    } catch (err) {
      console.log("Error", err);
      res.status(500).redirect("users/new");
    }
  },

  Search: (req, res) => {
    User.find(
      {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          // { email: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      },
      function (err, users) {
        if (err) {
          throw err;
        }
        res.render("users/search", { users: users, session: req.session });
      }
    );
  },
};

const UserValidation = [
  body("firstName")
    .isAlpha()
    .withMessage("Your first name must contain letters only.")
    .isLength({ min: 2, max: 20 })
    .withMessage("Your first name be 2 to 20 characters long."),
  body("lastName")
    .isAlpha()
    .withMessage("Your last name must contain letters only.")
    .isLength({ min: 2, max: 20 })
    .withMessage("Your last name must be 2 to 20 characters long."),
  body("username")
    .isAlphanumeric()
    .withMessage("Your username must contain letters and digits only.")
    .isLength({ min: 5, max: 20 })
    .withMessage("Your username must be 5 to 20 characters long."),
  body("username").custom(async (value) => {
    const users = await User.find({ username: value });
    if (users.length > 0) {
      return Promise.reject("Username already in use");
    }
  }),

  body("email").isEmail().withMessage("Please enter a valid email."),
  body("email").custom(async (value) => {
    const users = User.find({ email: value });
    if (users.length > 0) {
      return Promise.reject("Email already in use");
    }
  }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Please enter your password.")
    .isStrongPassword()
    .withMessage(
      "Your password must contain at least 1 uppercase letter, 1 symbol and 1 digit, and must longer than 8 characters."
    ),
  body("confirmPassword", "Passwords do not match").custom(
    (value, { req }) => value === req.body.password
  ),
  body("phoneNumber")
    .optional({ checkFalsy: true })
    .isMobilePhone()
    .withMessage("Please enter valid mobile phone number or leave blank"),
];
module.exports = { UsersController, UserValidation };
