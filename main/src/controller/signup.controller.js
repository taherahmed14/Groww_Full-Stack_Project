const express = require("express");
const mongoose = require("mongoose");

// const Home = require("../model/home.model");

const router = express.Router();

router.get("/", (req, res) => {
  //   const home = await Home.find({}).lean().exec();
  res.render("homePage/signup.ejs");
});

module.exports = router;
