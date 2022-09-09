const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  personId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  myCart: {
    type: Array,
  },
});

module.exports = mongoose.model("cart", cartSchema);
