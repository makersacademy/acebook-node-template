var mongoose = require("mongoose");

beforeAll(function (done) {
  mongoose.connect("mongodb://0.0.0.0/acebook_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.on("open", function () {
    done();
  });
});

afterAll(function (done) {
  mongoose.connection.close(true, function () {
    done();
  });
});


// deleteMany() to clear out data in between tests, rather than dropDatabase(). This ensures that you delete all documents, without clearing out database-level configuration, like indexes and collations. deleteMany() is also much faster than dropDatabase().