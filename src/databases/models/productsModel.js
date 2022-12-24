const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Products = mongoose.model('Products', new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  code: { type: String, required: true },
  image: {
    type: String,
    required: true
  },
  stock: { type: Number, required: true }

}))
module.exports = Products
