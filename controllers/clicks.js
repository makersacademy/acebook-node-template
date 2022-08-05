const Click = require("../models/click");

const ClicksController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const click = new Click(req.body);
    console.log(Click(req.body))
    click.save((err) => {
      if (err) {
        return console.log(err)
      }
      console.log('click added to db');
      res.sendStatus(201);

    });
  }
};

module.exports = ClicksController;
