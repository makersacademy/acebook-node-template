const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" });
  },
};

module.exports = HomeController;


// add to this page to make the appearance more dynamic :)
