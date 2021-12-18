const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../model/product.model');
const Cart = require("../model/cart.model");

//get all products
router.get('/', async (req,res) => {
    const products = await Product.find({}).lean().exec();
    res.render('products/products.ejs', {
        products,
    });
});

//get all products
router.get('/showProducts', async (req,res) => {
  const products = await Product.find({}).lean().exec();
  res.send({ products });
});

//get single products by id
router.get('/:id', async(req,res) => {
    // console.log(req.params.id);
    const product = await Product.findOne({_id : req.params.id}).lean().exec();
    // console.log(product);
    res.render('products/product_desc.ejs', {
        product,
    })
});

//Code to add products to cart after clicking add to cart button ***
router.get("/cart/:id", async(req, res) => {
    try{
      const product = await Product.findById(req.params.id).lean().exec();
      const addtocart = await Cart.create({ 
        id: product.id,
        product_image: product.product_image,
        product_name: product.product_name,
        amc: product.amc,
        risk: product.risk,
        category: product.category,
        rating: product.rating,
        percentage_interval: product.percentage_interval,
        fund_Category: product.fund_Category,
        fund_size: product.fund_size,
        nav: product.nav,
        return_percentage: product.return_percentage,
        price: 0,
        symbol: product.symbol
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

router.get("/cart/:id/:price", async(req, res) => {
  try{
    const product = await Cart.findByIdAndUpdate(req.params.id, { price: req.params.price }, { new: true });
    console.log(product);
    return res.send({ product });
  }
  catch(e){
    return res.status(500).json({
      message: e.message, 
      status: "Failed"
    });
  }
});

module.exports = router;
