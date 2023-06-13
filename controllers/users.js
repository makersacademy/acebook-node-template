const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  //Hash password

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(500).render('users/new', {error: err.message}); //fix this 
      } else {
        res.status(201).redirect("/posts");
      }
    });
  },
}

module.exports = UsersController;

/*
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/signup', (req, res) => {
  // Render the signup handlebars template
  res.render('signup', { errorMessage: null });
});

app.post('/signup', (req, res) => {
  // Validate the form inputs and check for errors
  const errors = [];
  // ... validate form inputs and populate the `errors` array if any

  if (errors.length > 0) {
    // Render the signup handlebars template with the error message
    res.render('signup', { errorMessage: 'Please correct the following errors: ' + errors.join(', ') });
  } else {
    // Process the successful form submission
    res.send('Sign up successful!');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



*/