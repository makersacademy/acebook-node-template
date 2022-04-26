const RhysController = {
  Index:  (req, res) => {
    res.render("rhys/index", {
      title: "Rhys' Easter Egg"
    });
  },
};

module.exports = RhysController;