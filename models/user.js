const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");


const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, required: false },
  photo: { type: Buffer, required: false },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: false },
});


// created a function that hashes the password
// UserSchema.pre("save", function (next) {
//   const user = this;
//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, function (saltError, salt) {
//       if (saltError) {
//         return next(saltError);
//       } else {
//         bcrypt.hash(user.password, salt, function (hashError, hash) {
//           if (hashError) {
//             return next(hashError);
//           }
//           user.password = hash;
//           next();
//         });
//       }
//     });
//   } else {
//     return next();
//   }
// });


// created a method that compares the password in the db and the password in the req.body
// UserSchema.methods.comparePassword = function (password, callback) {
//   console.log('compare passwords');
//   bcrypt.compare(password, this.password, function (error, isMatch) {
//     if (error) {
//       console.log('test 1');
//       return callback(error);
//     } else {
//       console.log('test2');
//       callback(null, isMatch);
//     }
//   });
// };


const User = mongoose.model("User", UserSchema);

module.exports = User;
