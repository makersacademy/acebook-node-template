var HomeController = {      // this refers to the class
  Index: function(req, res) {     // this refers to function/method within this class
    res.render('home/index', { title: 'Acebook' });  // render the home index from the folder and pass through 'Acebook' as a value so it can read it from the key
  }
};

module.exports = HomeController;  // variable that gets returned from require, empty object as default
