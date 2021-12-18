const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect('mongodb+srv://amar:groww@cluster0.bbxus.mongodb.net/groww');
}