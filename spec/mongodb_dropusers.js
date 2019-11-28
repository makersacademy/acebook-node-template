var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/acebook_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', function(done) {
    db.collections.posts.drop(function(done) {
        done();
    });
    done();
    afterAll();
  });

afterAll(function(done) {
  mongoose.connection.close(true, function() {
    done();
  });
});
