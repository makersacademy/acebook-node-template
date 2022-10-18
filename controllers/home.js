const HomeController = {
  Index: (req, res) => {
    res.render("sessions/new", { title: "Acebook", session: req.session });
  },
};

module.exports = HomeController;
