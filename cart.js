const express = require("express");

const cartSchema = require("./cartSchema");

const userSchema = require("./user");
const router = express.Router();

router.get("/myCart/all/items", async (req, res) => {
  try {
    const cart = await cartSchema.find();
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/myCart/all/items", async (req, res) => {
  try {
    const cart = await userSchema.findById(req.params.id);
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id/myCart/items/remove", async (req, res) => {
  try {
    const cart = await userSchema.updateOne(
      { _id: req.params.id },
      { $pull: { cart: { _id: req.body._id } } },
      { multi: true }
    );
    res.json(cart);
  } catch (error) {
    res.send("something wrong");
  }
});

router.put("/:id/update/cart", async (req, res) => {
  try {
    const updateCart = await userSchema.updateOne(
      { _id: req.params.id },
      { $push: { cart: req.body.cart } }
    );
    res.json(updateCart);
  } catch (error) {
    res.status("404").json(error);
  }
});

router.get("/:id/myCart/get/items", async (req, res) => {
  try {
    const cart = await cartSchema.findById(req.params.id);
    res.json(cart.cart);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id/update/cart", async (req, res) => {
  const id = await cartSchema.findOne({
    personId: req.params.id,
  });
  console.log(id);
  if (id === null) {
    const newCart = await cartSchema({
      personId: req.params.id,
    });
    const cart = await newCart.save();
    res.json(cart);
  } else {
    console.log(id.personId);
    try {
      const updateCart = await cartSchema.updateOne(
        { personId: req.params.id },
        { $push: { myCart: req.body.myCart } }
      );
      res.json(updateCart);
    } catch (error) {
      res.json(error);
    }
  }
});

router.delete("/:id/myCart/items/delete", async (req, res) => {
  try {
    const cart = await cartSchema.findOneAndDelete(req.params.id);
    res.json(cart);
    console.log(cart);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id/myCart/items/remove", async (req, res) => {
  try {
    const item = await cartSchema.findById(req.params.id);
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/myCart/items/deleteMany", async (req, res) => {
  try {
    const cart = await cartSchema.deleteMany();
    res.json(cart);
    console.log(cart);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
