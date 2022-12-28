
const ItemClass = require('../services/jsonDAO').ItemClass
// const Product = require('../services/jsonDAO').JsonDbManager
// const MongoManager = require('../services/mongoDbDAO')
// const productDbManager = new Product('./src/databases/product')
// const model = require('../databases/models/productsModel').Products
// const productDbManager = new MongoManager(model)

const ProductDbManager = require('../services/sqlDAO')
const productDbManager = new ProductDbManager('products', 'sqlite', 'products')

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
    res.status(data.status).send(data)
  }
  const getItems = async (req, res) => {
    let data
    console.log(req.params.id, 'params')
    if (req.params.id !== undefined) {
      data = await productDbManager.getByID(req.params.id)
    } else {
      data = await productDbManager.getAll()
    }

    res.status(data.status).send(data)
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
    res.status(data.status).send(data)
  }
  const deleteItem = async (req, res) => {
    const data = await productDbManager.deleteById(
      req.params.id
    )
    res.status(data.status).send(data)
  }

  return { postItem, updateItem, deleteItem, getItems }
}
const productController = productControllers()

module.exports = productController
