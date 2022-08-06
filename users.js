const express = require("express");
const shortid = require("short-id");
const nodemailer = require("nodemailer");

const router = express.Router();
const userSchema = require("./user");

const { deleteMany, updateOne, findByIdAndUpdate } = require("./Schema");

router.get("/users", async (req, res) => {
  const userlist = await userSchema.find();
  res.json(userlist);
});

router.get("/userSort", async (req, res) => {
  const userlist = await userSchema.find().sort({ fname: 1, lname: 1 });
  res.json(userlist);
});

router.post("/search", async (req, res) => {
  const abook = await userSchema.updateOne(
    { _id: req.body._id },
    { $push: { History: req.body.History } }
  );
  res.json(abook);
});

router.post("/data", async (req, res) => {
  const id = shortid.generate();

  const newUser = new userSchema({
    Mobile: req.body.Mobile,
    email: req.body.email,
    password: req.body.password,
    code: id,
    fname: req.body.fname,
    lname: req.body.lname,
    confpassword: req.body.confpassword,
  });

  const Save = await newUser.save();
  res.json(Save);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "prathameshthorat625@gmail.com",
      pass: "lbbv vtuj musu gfon",
    },
  });

  var mailOptions = {
    from: "prathameshthorat625@gmail.com",
    to: `${Save.email}`,
    subject: `Email verifiaction`,
    text: `verification code for email is ${id}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sented succesfully" + info.response);
    }
  });
});

router.post("/verification", async (req, res) => {
  const codeVerify = await userSchema.findOne({ code: req.body.code });

  if (codeVerify) {
    res.send(codeVerify);
  } else {
    res.send("invalid code");
  }
});

router.post("/emailUpdation", async (req, res) => {
  const update = await userSchema.updateOne(
    { _id: req.body._id },
    { $set: { email: req.body.email } }
  );
  if (update.matchedCount === 1) {
    res.json("updated");
  } else {
    res.json("not updated");
  }
  res.json(update);
});
/*
router.post("/purchased", async (req, res) => {
  const purchased = await userSchema.findByIdAndUpdate(
    { _id: req.body._id },
    {
      $push: {
        orderedHistory: req.body.orderedHistory,
      },
    }
  );
  res.json(purchased);
});
*/

router.post("/login", async (req, res) => {
  const userLogin = await userSchema.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (userLogin) {
    res.json(userLogin);
  } else {
    res.json("User does not exist");
  }
});

router.post("/deleteMany", async (req, res) => {
  const deleUser = await userSchema.deleteMany([{ _id: req.body._id }]);
  res.json(deleUser);
});

module.exports = router;
