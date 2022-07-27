const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const booksSchema = require("./Schema");

router.get("/booklist", async (req, res) => {
  const books = await booksSchema.find();
  res.json(books);
});

router.post("/newBook", async (req, res) => {
  const newBook = new booksSchema({
    name: req.body.name,
    title: req.body.title,
    publications: req.body.publications,
    price: req.body.price,
    stars: req.body.stars,
    information: req.body.information,
    imgurl: req.body.imgurl,
  });

  const book = await newBook.save();
  res.json(book);
});

router.post("/searchAbook", async (req, res) => {
  const searchBook = await booksSchema.find({ name: req.body.name });
  res.json(searchBook);
});

router.get("/searchbook/mpsc", async (req, res) => {
  const mpsc = await booksSchema.find({ title: "mpsc" });
  res.json(mpsc);
});
router.get("/searchbook/upsc", async (req, res) => {
  const upsc = await booksSchema.find({ title: "upsc" });
  res.json(upsc);
});
router.get("/searchbook/novels", async (req, res) => {
  const novels = await booksSchema.find({ title: "novels" });
  res.json(novels);
});
router.get("/searchbook/agriculture", async (req, res) => {
  const agriculture = await booksSchema.find({ title: "agriculture" });
  res.json(agriculture);
});
router.get("/searchbook/lawBooks", async (req, res) => {
  const lawbooks = await booksSchema.find({ title: "lawbooks" });
  res.json(lawbooks);
});
router.get("/searchbook/Gods", async (req, res) => {
  const gods = await booksSchema.find({ title: "gods" });
  res.json(gods);
});

router.post("/updateBookDetails", async (req, res) => {
  const update = await booksSchema.updateOne(
    { _id: req.body._id },
    {
      name: req.body.name,
      title: req.body.title,
      publications: req.body.publications,
      price: req.body.price,
      stars: req.body.stars,
      information: req.body.information,
      imgurl: req.body.imgurl,
    }
  );
  if (update.matchedCount === 1) {
    res.json("updated Succesfully");
  } else {
    res.json("not Updated");
  }
});

router.get("/SortBookByName", async (req, res) => {
  const sortByName = await booksSchema.find().sort({ name: 1 });
  res.json(sortByName);
});

router.post("/deleteBook", async (req, res) => {
  const deleteBook = await booksSchema.deleteOne({
    //name: req.body.name,
    _id: req.body._id,
  });
  res.json(deleteBook);
});

module.exports = router;
