const User = require("../models/user");
const bcrypt = require("bcrypt");



const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res, ) => {
    
     console.log(req.body)
    if (!(req.body.email && req.body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    } 
    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user.password)
    await user.save().then((doc) => res.status(201).redirect("/sessions/new"));
  }
  
};


module.exports = UsersController;
