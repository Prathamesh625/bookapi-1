const express = require("express");

const schema = require("./Schema");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
//mongo = "mongodb://localhost/database";

mongo =
  "mongodb+srv://625Prathamesh:gykwTRUSaxSIxSeM@bookstorebackend.h49yq.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", () => console.log("something wrong"));
db.once("open", () => {
  console.log("connected to database");
});

app.get("/booklist", async (req, res) => {
  const books = await schema.find();
  res.json(books);
});

app.use("/new", require("./users"));
app.use("/book", require("./books"));
app.listen(PORT, console.log("working succesfully at " + PORT));
