const SaiyuktaController = {
  Index: (req, res) => {
    res.render("sigh/index", { title: "Saiyukta Easter Egg" });
  },
};

module.exports = SaiyuktaController;