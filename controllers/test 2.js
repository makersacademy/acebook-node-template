var testController = {
  Index: function(req, res) {
    //if (err) { throw err; } 
    res.render('test/index',{ title: 'Hello world' });
  }
}
module.exports = testController;