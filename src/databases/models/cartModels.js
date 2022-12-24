const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Products = require('./productsModel').productSchema
const Carts = mongoose.model('Carts', new Schema({ products: [Products] }, { timestamps: true }))
module.exports = Carts
