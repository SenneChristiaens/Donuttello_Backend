const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const donutSchema = new Schema({
  donutName: String,
  company: String,
  companyUrl: String,
  email: String,
  snapshot: String,
  quantity: Number,
  comment: String,
  glazeColor: String,
  topping: String,
  toppingColor: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Bestelling geplaatst" },
});

const Donut = mongoose.model("Donut", donutSchema);

module.exports = Donut;
