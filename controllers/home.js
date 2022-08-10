const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Acebook" });
  },
  Login: (req, res) => {
    res.render("sessions/new", {});
    // when I call login, I want a return the sessions/new page
  } 
};

// method to go to homepage

module.exports = HomeController;
