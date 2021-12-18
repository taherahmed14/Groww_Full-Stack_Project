const express = require("express");
const mongoose = require("mongoose");

const Home = require("../model/home.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const home = await Home.find({}).lean().exec();
  res.render("homePage/home.ejs", {
    home,
  });
});

module.exports = router;
 