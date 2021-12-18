
const express = require('express');
const Product = require('../model/product.model');

const mongoose = require('mongoose');

const router = express.Router();


//get all products
let arr = [];   
router.get('/', async (req,res) => {
     let research = '';
     let category = '';
     console.log(req.query.cat);
    if ( req.query.amc === undefined || req.query.amc === ''){
        research = '';
    }
    else { 
         research = req.query.amc.trim().split(','); 
    }
    if ( req.query.cat === undefined || req.query.cat === ''){
        category = '';
    }
    else { 
         category = req.query.cat.trim().split(','); 
         category.pop();
    }
    


    console.log(research);
    console.log(category);
    let products = [];

    if ( research === ''){
        const products = await Product.find({}).lean().exec();
        res.render('products/products.ejs', {
            products,
        });

    }
    else {
        
            products = await Product.find({$or: [{ amc : {$in : research} },  { category : {$in : category} }]}).lean().exec();
            
        }
        console.log(products.length);
        
        res.render('products/products.ejs', {
            products,
        });
   
  // console.log(products.length);
    // console.log(products);
    // res.render('products/all.ejs', {
    //     products,
    // });

});

//get single products by id


router.get('/:id', async(req,res) => {
    console.log(req.params.id);
    const product = await Product.findOne({_id : req.params.id}).lean().exec();
    console.log(product);
    res.render('products/product_desc.ejs', {
        product,
    })
})



module.exports = router;
