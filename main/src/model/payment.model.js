const mongoose = require('mongoose');

const paymentSchmea = new mongoose.Schema({
    credential: { type: String, required: true },
    payment_type: { type: String, required: true }
});

module.exports  = mongoose.model('payment', paymentSchmea);

