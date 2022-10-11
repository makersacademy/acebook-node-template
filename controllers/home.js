const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook", layout: 'login' });
  },
};

module.exports = HomeController;
