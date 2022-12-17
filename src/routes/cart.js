const Router = require('express').Router
const CartControllers = require('../controllers/cart.controller')
const cartController = CartControllers()
const cartRoutes = Router()
cartRoutes.delete('/:id', cartController.deleteCart)
cartRoutes.get('/:id', cartController.getCart)
cartRoutes.post('/', cartController.createCart)
cartRoutes.post('/:id/products', cartController.addProduct)
cartRoutes.delete('/:id/products/:idProd', cartController.deleteProduct)

module.exports = cartRoutes
