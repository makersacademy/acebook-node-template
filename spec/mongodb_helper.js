var mongoose = require("mongoose");
// const userSeeds = require('userSeeds')

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

// beforeEach((done) => {
//   mongoose.connection.collections.users.drop(() => {
//     done()
//   })
//   .then(() => {
//     // Product.insertMany(userSeeds);
//     // mongoose.connection.collections.users.insertMany(userSeeds);
//   })
// });


afterAll(function (done) {
  mongoose.connection.close(true, function () {
    done();
  });
});
