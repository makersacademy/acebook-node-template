var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("acebook_test2");
  var acebook_test2 = [
    {email: "test1@mail.com", password: "password1", firstName: "name1", lastName: "lastname1"},
    {email: "test2@mail.com", password: "password2", firstName: "name2", lastName: "lastname2"},
    {email: "test3@mail.com", password: "password3", firstName: "name3", lastName: "lastname3"},
    {email: "test4@mail.com", password: "password4", firstName: "name4", lastName: "lastname4"}
  ];
  dbo.collection("User").insertMany(acebook_test2, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});