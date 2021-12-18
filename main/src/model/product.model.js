const mongoose = require('mongoose');


const productSchmea = new mongoose.Schema({
});



module.exports  = mongoose.model('product', productSchmea);

