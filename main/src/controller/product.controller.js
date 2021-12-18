
const express = require('express');
const Product = require('../model/product.model');

const mongoose = require('mongoose');

const router = express.Router();


//get all products
router.get('/', async (req,res) => {
    const products = await Product.find({}).lean().exec();
    res.render('products/products.ejs', {
        products,
    });
});

//get single products by id

router.get('/:id', async(req,res) => {
    console.log(req.params.id);
    const product = await Product.findOne({_id : req.params.id}).lean().exec();
    console.log(product);
    res.render('products/product_desc.ejs', {
        product,
    })
});

//Code to add products to cart after clicking add to cart button ***
router.get("/cart/:id", async(req, res) => {
    try{
      // console.log(req.params.id);
      // console.log(product);
      // console.log("reached");
      // console.log(addtocart);
      const product = await Product.findById(req.params.id).lean().exec();
      const addtocart = await Cart.create({ 
        title: product.title,
      });
      return res.send({ addtocart });
    }
    catch(e){
      return res.status(500).json({
          message: e.message, 
          status: "Failed"
      });
    }
  });

module.exports = router;
