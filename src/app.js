const express = require('express')
const app = express()
const colors = require('colors')
const products = require('./routes/products')
const cart = require('./routes/cart')
const morgan = require('morgan')
const PORT = process.env.PORT || 8080
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('db', 'sqlite')
app.use('/', products)
app.use('/cart/', cart)
// eslint-disable-next-line no-unused-vars
const server = app.listen(PORT, () => {
  console.log(colors.bgBlue.white.bold(`Server online on port ${PORT}`))
})
