const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  posts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Post"}],
});

const User = mongoose.model("User", UserSchema);


// UserSchema.post('save', function (doc, next) {
//   // capitalize
//   doc.firstName = "hello";
//   doc.();
//   // this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);  
//   next();
// });



module.exports = User;
