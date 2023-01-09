const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  friends: {type: [String], default: ["catbot"]}
});

const User = mongoose.model("User", UserSchema);
const friend = new User({username: "Kitten", email: "kitten@kitten.com", password: "password "})
//friend.friends.push("Steve")
// db.collection.update(
//   { email: ObjectId("kitten@kitten.com")},
//   { $push: { friends: "Steve" } }
// )
//friend.save()
User.findOneAndUpdate(
  { _id:	"63bc4bc14dbd82782c7cc65c" }, 
  { $push: { 
            friends : "Steve"
          } 
  })
module.exports = User;