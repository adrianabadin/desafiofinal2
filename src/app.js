const express = require('express')
const app = express()
const colors = require('colors')
const products = require('./routes/products')
const cart = require('./routes/cart')
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))

process.env.storage = 'sqlite'
app.use('/', products)
app.use('/cart/', cart)
// eslint-disable-next-line no-unused-vars
const server = app.listen(PORT, () => {
  console.log(colors.bgBlue.grey(`Server online on port ${PORT}`))
})
