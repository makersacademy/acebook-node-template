// const User = require("../models/user");

// const UserPostsController = {
//     Create: (req, res) => {
//       const username = req.params.username; 
//       const content = req.body.content; 
  
//       User.findOneAndUpdate( { username }, { $push: { posts: { content } } }, { new: true },
//         (err) => {
//           if (err) {
//             throw err;
//           }
//           res.status(201).redirect(`/users/${username}`); 
//         }
//       );
//     },
//   };
  
//   module.exports = UserPostsController;



