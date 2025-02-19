const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  productid: { type: Number, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: { type: String, required: true },
  discount: { type: String, required: true },
});

const WishList = mongoose.model("WishList", wishListSchema);

module.exports = WishList;