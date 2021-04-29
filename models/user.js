var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: [true, 'Email cannot be blank'],
  },
  password: {
    type: String, 
    required: [true, 'Password cannot be blank']
  },
  username: {
    type: String,
    required: [true, 'Username cannot be blank']
  },
  bio: { 
    type: String,
    default: "I have not written a bio yet",
    required: false
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Post"
  }],
  profilePicture:{
      type: String, 
      default:'https://images.unsplash.com/photo-1619409436657-56cafd59ef96?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80'
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = User; 
