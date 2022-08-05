const Click = require("../models/click");

const ClicksController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    console.log('hello')
    const click = new Click(req.body);
    console.log('this is it' + click)
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
