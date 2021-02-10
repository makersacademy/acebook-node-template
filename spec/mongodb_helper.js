// var mongoose = require('mongoose');

// beforeAll(function(done) {
//   mongoose.connect('mongodb://localhost/acebook_test', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });

//   var db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//   db.on('open', function() {
//     done();
//   });
// });

// afterAll(function(done) {
//   mongoose.connection.close(true, function() {
//     done();
//   });
// });

const {MongoClient} = require('mongodb');
 
describe('insert', () => {
  let connection;
  // eslint-disable-next-line no-unused-vars
  let db;
 
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = connection.db();
  });
 
  afterAll(async () => {
    await connection.close();
  });
});