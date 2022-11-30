const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const donutSchema = new Schema({
  name: String,
  email: String,
  date: { type: Date, default: Date.now },
});

const Donut = mongoose.model("Donut", donutSchema);

module.exports = Donut;
