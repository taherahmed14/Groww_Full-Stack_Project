const express = require("express");
const Cart = require("../model/cart.model");
const router = express.Router();

//To get the data from cart collection ***
router.get("/", async(req, res) => {
      const cart = await Cart.find().lean().exec();
      //Where we are passing the data and which data we are passing
      //products is the folder name and cart_page is the file name
        // return res.render("products/all_cart", {
        //   cart,
        // });
        return res.send(cart);
});

module.exports = router;