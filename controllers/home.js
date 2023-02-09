const HomeController = {
  Index: (req, res) => {
    //specifies a specific layout to avoid displaying universal navbar in layout.hbs
    res.render("home/index", { layout: 'home/index', title: 'Acebook'});
  },
};

module.exports = HomeController;

