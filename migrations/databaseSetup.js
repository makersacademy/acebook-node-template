// ADDING AUTHOR KEY VALUE PAIR TO POSTS COLLECTION

// Steps:
// (navigate to the right database)
// mongo
// show dbs
// use acebook_test

// db.posts.updateMany({}, {$set: {"author":""}})

// (to see if your update was successful)
// db.posts.find().pretty();

// Repeat above steps for your acebook database