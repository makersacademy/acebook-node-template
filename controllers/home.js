const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", shownavbar:false });
  },
};

module.exports = HomeController;
