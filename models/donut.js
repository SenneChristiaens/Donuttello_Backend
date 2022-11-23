const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const donutSchema = new Schema({
    name: String,
    email: String,
});

const Donut = mongoose.model("Donut", donutSchema);

module.exports = Donut;
