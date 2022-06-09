var mongoose = require("mongoose")

const resetDatabase = () => {
  mongoose.connection.collections.posts.drop(() => {

  });
}

module.exports = resetDatabase;