const mongoose = require("mongoose");
const booksSchema = require("./Schema");

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  Mobile: Number,
  email: { type: String, required: true },
  password: String,
  confpassword: String,
  code: String,
  date: { type: Date, default: Date.now },
  orderedHistory: [],
  cart: [],
});

module.exports = mongoose.model("schema", userSchema);
