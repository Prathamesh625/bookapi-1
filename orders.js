const mongoose = require("mongoose");
const orders = mongoose.Schema({
  name: String,
  userId: String,
  mobile_no: Number,
  order: [],
  address: String,
  delivered: Boolean,
});

module.exports = mongoose.model("orders", orders);
