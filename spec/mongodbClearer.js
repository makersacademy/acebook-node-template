const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0/acebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>mongoose.connection.collections.users.drop(() => {});)



mongoose.connection.close(true, function () {});
