const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    id: { type: String, required: true },
    product_image: { type: String, required: true },
    product_name: { type: String, required: true },
    amc: { type: String, required: true },
    risk: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: String, required: true },
    percentage_interval: [{ type: String, required: true }],
    fund_Category: { type: String, required: true },
    fund_size: { type: String, required: true },
    nav: { type: String, required: true },
    return_percentage: { type: String, required: true },
    price: { type: String, required: true },
    symbol: { type: String, required: true }
},{
    versionKey: false,
    timestamps: true
});

module.exports = model("cart", cartSchema);