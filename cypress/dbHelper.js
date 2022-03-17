const mongoose = require('mongoose');

const resetDb = (collection) => { 
  mongoose.connect('mongodb://127.0.0.1/acebook_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).dropCollection(collection)
};

module.exports = resetDb