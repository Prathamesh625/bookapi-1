const mongoose = require("mongoose");
const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  title: {
    type: String,
    // required: true,
  },
  publications: {
    type: String,
    //  required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  stars: {
    type: Number,
    //  required: true,
  },
  information: {
    type: String,
    // required: true,
  },
  imgurl: String,
});

module.exports = mongoose.model("book", booksSchema);
