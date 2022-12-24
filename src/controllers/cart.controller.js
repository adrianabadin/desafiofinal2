const colors = require('colors')
const ItemClass = require('../services/jsonDAO').ItemClass
const uuid = require('uuid')
// const Product = require('../services/jsonDAO').JsonDbManager
// const cartDbManager = new Product('./src/databases/cart')
const MongoDAO = require('../services/mongoDbDAO')
const model = require('../databases/models/cartModels')
const cartDbManager = new MongoDAO(model)
// const CartDbManager = require('../services/firestoreDAO')
// const cartDbManager = new CartDbManager('carts')
function CartControllers () {
  const createCart = async (req, res) => {
    try {
      const response = await cartDbManager.addItem({ id: 0, timeStamp: Date.now(), products: [] })
      res.status(201).send(response)
    } catch (err) { res.status(400).send('Didnt Create Resource (Cart)') }
  }

  const addProduct = async (req, res) => {
    console.log('addproduct', req.body)
    try {
      const data = { ...req.body, id: uuid.v4() }
      const id = req.params.id
      const transitionObject = await cartDbManager.getById(id)
      const cleanObject = transitionObject.data
      console.log(transitionObject, id, 'DATA:', data, colors.red(cleanObject))
      cleanObject.products.push(new ItemClass(data.id, data.name, data.description, data.code, data.image, data.price, data.stock))
      console.log(colors.red(cleanObject), 'CleanObj')
      const response = await cartDbManager.updateById(cleanObject, req.params.id)
      res.status(response.status).send(response.data)
    } catch (e) { res.status(400).send({ err: 'Unable to add item to the cart ' }) }
  }
  const getCart = async (req, res) => {
    const id = parseInt(req.params.id)
    const data = await cartDbManager.getById(id)
    res.status(data.status).send(data.data)
  }
  const deleteCart = async (req, res) => {
    const id = req.params.id
    let data
    const doc = await cartDbManager.getById(id)
    if (doc.ok) {
      data = await cartDbManager.deleteById(id)
    } else data = { status: 400, err: 'Cart doesnt exist' }
    res.status(data.status).send(data.err)
  }
  const deleteProduct = async (req, res) => {
    const { id, idProd } = req.params
    let response
    const { data, ok } = await cartDbManager.getById(id)
    if (ok) {
      const index = data.products.findIndex((product) => { return product.id === idProd })
      data.products.splice(index, 1)
      response = await cartDbManager.updateById(data, id)
    } else response = { status: 400, data: 'The cart doesnt exist' }
    res.status(response.status).send(response.data)
  }
  return { createCart, addProduct, getCart, deleteCart, deleteProduct }
}

module.exports = CartControllers
