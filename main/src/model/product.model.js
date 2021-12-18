const mongoose = require('mongoose');


const productSchmea = new mongoose.Schema({
    amc : {type : String, required: false},
    category : {type: String, required: false},
    risk : {type: String, required: false},
    fund_size :{type: String, required: false}
 });
 

module.exports  = mongoose.model('product', productSchmea);

