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


// ADDING LIKE_COUNT and LIKERS to Posts collection
// use acebook
// db.posts.updateMany({}, {$set: {"like_count":0}})
// db.posts.updateMany({}, {$set: {"likers": []}})
// Repeat with test database