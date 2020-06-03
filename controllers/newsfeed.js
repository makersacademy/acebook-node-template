var NewsfeedController = {
  Index: function(req, res) {
    res.render('newsfeed/index');
  },
  Posts: function(req, res) {
    // res.setHeader('Content-Type', 'application/json');
    res.send({name: "Tommy"})
  }
};

module.exports = NewsfeedController;
