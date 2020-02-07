var HomeController = {      // class
  Index: function(req, res) {     // function / method
    res.render('home/index', { title: 'Acebook' });  // render the home index from the folder and pass through 'Acebook' as a value so it can read it from the key
  },

  Error: function(req, res) {     // function / method
    res.render('ourErrors') // render the home index from the folder and pass through 'Acebook' as a value so it can read it from the key
  }

};

module.exports = HomeController;  // variable that gets returned from require, empty object as default
