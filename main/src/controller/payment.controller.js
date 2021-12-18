const express = require("express");
const Cart = require("../model/cart.model");
const Payment = require("../model/payment.model");
const router = express.Router();

router.get("/:id/:type", async(req, res) => {
    try{
      const payment = await Payment.create({ 
        credential: req.params.id,
        payment_type: req.params.type
      });
      console.log(payment);
      return res.send({ payment });
    }
    catch(e){
      return res.status(500).json({
          message: e.message, 
          status: "Failed"
      });
    }
});

router.get("/price", async(req, res) => {
  try{
    let cart = await Cart.find({}, {price: 1}).lean().exec();
    let sum = 0; 
    for(let i = 0; i < cart.length; i++){
      sum += cart[i].price;
    }
    return res.send({ sum });
  }
  catch(e){
    return res.status(500).json({
      message: e.message, 
      status: "Failed"
    });
  }
});

//To get the data from cart collection ***
router.get("/", async(req, res) => {
      const cart = await Cart.find().lean().exec();
      //Where we are passing the data and which data we are passing
      //products is the folder name and cart_page is the file name
        return res.render("products/payment", {
          cart,
        });
        // return res.send(cart);
});

module.exports = router;