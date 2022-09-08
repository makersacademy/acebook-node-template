// const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {
    //   User.findOne({ email: email }).then((user) => {
    //     if (!user) {
    //       res.render("home/index", { error: "Incorrect credentials" });
    //       // res.redirect("/")
    //     } else if (user.password != password) {
    //       console.log("Error");
    //       res.render("home/index", { error: "Incorrect credentials" });
    //       // res.redirect("/");
    //     } else {
    //       req.session.user = user;
    //       res.redirect("/posts");
    //     }
    //   });

    res.render("profile/index", {
      title: "Acebook",
    });
    console.log(req.session.user);
  },
};

module.exports = ProfileController;
