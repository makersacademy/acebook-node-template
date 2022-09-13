const HomeController = {
  Index: (req, res) => {
    let username = null;
    if (req.session.user) {
      username = req.session.user.username;
      console.log(username);
    }
    console.log(username);
    res.render("home/index", { title: "Acebook", user: username });
  },
};

module.exports = HomeController;
