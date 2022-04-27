const mongoose = require("mongoose");
let resolveConnection;

/**
 * @type {Promise<Mongoose>}
 */
module.exports.connection = new Promise(resolve => resolveConnection = resolve);

module.exports.init = async function (mongoDbUrl) {
  resolveConnection(await mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
}
