const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  personName: {
    type: String,
  },
  personId: {
    type: String,
    required: true,
  },
  personAddress: {
    type: String,
    required: true,
  },
  orderDetails: {
    type: Array,
    required: true,
  },

  payment: {
    success: {
      type: Boolean,
    },
    amount: {
      type: String,
    },
  },

  delivered: {
    type: Boolean,
  },

  date: {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
});

module.exports = mongoose.model("order", orderSchema);
