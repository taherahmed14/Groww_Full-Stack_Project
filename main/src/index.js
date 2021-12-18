const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connect = require('./configis/db');

const homeController = require('./controller/home.controller');
const productController = require('./controller/product.controller');
const cartController = require('./controller/cart.controller');

app.use(express.json());
app.use(express.static('public'));
app.set('view engine','ejs');

app.use('/',homeController);

app.use('/products', productController);
app.use("/cart", cartController);

app.listen('2500' , async () => {
    await connect();
  console.log("We are listening 2500");
})