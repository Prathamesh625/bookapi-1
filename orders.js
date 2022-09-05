const express = require("express");
const orderSchema = require("./orderSchema");
const router = express.Router();
const orederSchema = require("./orderSchema");

router.get("/All/Orders", async (req, res) => {
  try {
    const orders = await orderSchema.find();
    console.log(orders);
  } catch (error) {
    console.log(error);
  }
});

router.get("/yourOrders/details/:id", async (req, res) => {
  try {
    const orders = await orderSchema.findById(req.params);
    console.log(orders);
  } catch (error) {
    console.log(error);
  }
});

router.post("/create/new/order", async (req, res) => {
  let datetime = new Date();
  var time = datetime.toLocaleTimeString("en-GB", {
    timeStyle: "short",
  });
  var date = datetime.toLocaleString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const orders = new orderSchema({
    personName: req.body.personName,
    personId: req.body.personId,
    personAddress: req.body.personAddress,
    orderDetails: req.body.orderDetails,
    payment: req.body.payment,
    delivered: req.body.delivered,
    date: {
      date: date,
      time: time,
    },
  });
  try {
    const newOrder = await orders.save();
    console.log(newOrder);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
