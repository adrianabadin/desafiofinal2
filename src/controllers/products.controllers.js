
const ItemClass = require('../services/jsonDAO').ItemClass
const colors = require('colors')
// const Product = require('../services/jsonDAO').JsonDbManager
const MongoManager = require('../services/mongoDbDAO')
// const productDbManager = new Product('./src/databases/product')
const model = require('../databases/models/productsModel').Products
const productDbManager = new MongoManager(model)
// const ProductDbManager = require('../services/firestoreDAO')
// const productDbManager = new ProductDbManager('products')
function productControllers () {
  const postItem = async (req, res) => {
    const item = req.body
    console.log('postMethod')
    console.log(item)
    const data = await productDbManager.addItem(
      new ItemClass(
        0,
        item.name,
        item.description,
        item.code,
        item.image,
        item.price,
        item.stock
      )
    )
    console.log(data.err)
    res.status(responseAnalizer(data).status).send(responseAnalizer(data).data)
  }
  const getItems = async (req, res) => {
    let data
    console.log(req.params.id, 'params')
    if (req.params.id !== undefined) {
      data = await productDbManager.getById(req.params.id)
    } else {
      data = await productDbManager.getAll()
    }

    res.status(responseAnalizer(data).status).send(responseAnalizer(data))
  }
  const updateItem = async (req, res) => {
    const data = await productDbManager.updateById(
      new ItemClass(
        0,
        req.body.name,
        req.body.description,
        req.body.code,
        req.body.image,
        req.body.price,
        req.body.stock
      ), req.params.id
    )

    res.status(responseAnalizer(data).status).send(responseAnalizer(data).data)
  }
  const deleteItem = async (req, res) => {
    const data = await productDbManager.deleteById(
      req.params.id
    )
    res.status(responseAnalizer(data).status).send(responseAnalizer(data).data)
  }
  function responseAnalizer (data) {
    if (data.ok) {
      return { status: data.status, data: data.data }
    } else return { status: data.status, data: data.err }
  }
  return { postItem, updateItem, deleteItem, getItems }
}
const productController = productControllers()

module.exports = productController
