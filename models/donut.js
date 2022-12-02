const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const donutSchema = new Schema({
  name: String,
  company: String,
  email: String,
  date: { type: Date, default: Date.now },
  url: String,
  status: { type: String, default: "Bestelling geplaatst" },
});

const Donut = mongoose.model("Donut", donutSchema);

module.exports = Donut;
