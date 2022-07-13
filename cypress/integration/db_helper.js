var mongoose = require("mongoose");

const dropCollection = () => {
  mongoose.connect("mongodb://0.0.0.0/acebook_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(mongoose.connection.collections.posts.drop(() => {
  console.log("posts database dropped");
}))

.then(mongoose.connection.close())
}

// beforeAll(function (done) {
//   mongoose.connect("mongodb://0.0.0.0/acebook_test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   var db = mongoose.connection;
//   db.collections.posts.drop(() => {
//   console.log("posts database dropped");
//     });
  
  

 
//   db.on("error", console.error.bind(console, "MongoDB connection error:"));
//   db.on("open", function () {
//     done();
//   });

//   mongoose.connection.close()(true, function () {
//     done();
//   });
// });

// afterAll(function (done) {
//   mongoose.connection.close(true, function () {
//     done();
//   });
// });




