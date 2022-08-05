const mongoose = require("mongoose");


const ClickSchema = new mongoose.Schema({
  // click: { type: Number }
});

const Click = mongoose.model("Click", ClickSchema)

// console.log(Click)

module.exports = Click; 