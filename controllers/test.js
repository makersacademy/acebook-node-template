console.log(7)
var testController = {
  Index: function(req, res) {
    res.render('test/index', {title: 'First try'});
  }
};
module.exports = testController;
console.log(8)