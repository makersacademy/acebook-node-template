const OrlaneController = {
  Index: (req, res) => {
    res.render("orlane/index", { title: "Orlane's Easter Egg" });
  },
};

module.exports = OrlaneController;