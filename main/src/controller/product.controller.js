const express = require('express');
const Product = require('../model/product.model');
const Cart = require("../model/cart.model");

const mongoose = require('mongoose');

const router = express.Router();

//get all products
let arr = [];   
router.get('/', async (req,res) => {
    
     

      let cat =   req.query.cat ;
      let amc =    req.query.amc ;
      let fund =  req.query.fund;
      let risk =   req.query.risk;
      let products = [];
      let arr= [amc,cat,risk,fund];
      
      let ans = [];
      let name_of_filter = ["amc","category","risk","fund_size"];
      let name = [];
      console.log(arr);
      for ( let i = 0; i < arr.length; i++){
          if ( arr[i] != '' && arr[i] != undefined) 
          {
              ans.push(arr[i]);
              name.push(name_of_filter[i]);

          }

      }
      console.log(ans)
      console.log(name);
    //   console.log(req.query.cat )
    //   console.log( req.query.amc)
    //   console.log(req.query.fund)
    //   console.log( req.query.risk)
 if (ans.length === 0){
     products = await Product.find({}).lean().exec();
 }
       
       if ( ans.length == 1){
           let name1 = name[0];
           let arr = ans[0].trim().split(',');
           //console.log(name1)
           let query =  {
           }
          query[name1] = arr;
        console.log(query)
           products = await Product.find(query).lean().exec();
          // console.log(products);
       } 

    else if ( ans.length == 2){

           //console.log(name1)
           let obj1 =  {
           }
           let obj2 = {};

          obj1[name[0]] =ans[0].trim().split(',');
          obj2[name[1]] = ans[1].trim().split(',');
        
        console.log(obj1,obj2);
           products = await Product.find({$and : [obj1,obj2]}).lean().exec();

    }
    else if ( ans.length == 3){

        //console.log(name1)
        let obj1 =  {
        }
        let obj2 = {};
        let obj3 = {};

       obj1[name[0]] =ans[0].trim().split(',');
       obj2[name[1]] = ans[1].trim().split(',');
       obj3[name[2]] = ans[2].trim().split(',');


    
     
     console.log(obj1,obj2);
        products = await Product.find({$and : [obj1,obj2,obj3]}).lean().exec();

 }

    
    

  

        res.render('products/products.ejs', {
            products,
        });

    }
);

//get single products by id
router.get('/:id', async(req,res) => {
    // console.log(req.params.id);
    const product = await Product.findOne({_id : req.params.id}).lean().exec();
    // console.log(product);
    res.render('products/product_desc.ejs', {
        product,
    })
})


// ------------------product description routes---------------------

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

//get all products
router.get('/showProducts/:inputValue', async (req,res) => {
  try{
    const products = await Product.find({}, {product_name: 1}).lean().exec();
    let searchedProducts = [];
    products.forEach(({ product_name, _id }) => {
      let temp = "";
      for(let i = 0; i < product_name.length; i++){
        temp += product_name[i]
        if(temp == req.params.inputValue || temp.toLowerCase() == req.params.inputValue){
          searchedProducts.push({ product_name , _id});
        }
      }
    });
    return res.send({ searchedProducts });
  }
  catch(e){
    return res.status(500).json({
        message: e.message, 
        status: "Failed"
    });
  }
});

module.exports = router;
