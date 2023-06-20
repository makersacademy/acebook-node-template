const HomeController = {
  Index: (req, res) => {
    res.render("sessions/new", { title: "Acebook" });
  },
};

module.exports = HomeController;
