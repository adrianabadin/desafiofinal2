
const ItemClass = require('../services/dbService').ItemClass
const Product = require('../services/dbService').JsonDbManager
const productDbManager = new Product('./databases/product')

function productControllers () {
  const postItem = async (req, res) => {
    const item = req.body
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
    res.status(responseAnalizer(data).status).send(responseAnalizer(data).data)
  }
  const getItems = async (req, res) => {
    let data
    console.log(req.params.id, 'params')
    if (req.params.id !== undefined) {
      data = await productDbManager.getById(parseInt(req.params.id))
    } else {
      data = await productDbManager.getAll()
    }

    res.status(responseAnalizer(data).status).send(responseAnalizer(data))
  }
  const updateItem = async (req, res) => {
    const uploadedImage = `./images/${req.file?.filename}`
    const data = await productDbManager.updateById(
      new ItemClass(
        parseInt(req.params.id),
        req.body.name,
        req.body.description,
        req.body.code,
        req.body.image,
        req.body.price,
        req.body.stock
      ), parseInt(req.params.id)
    )
    res.status(responseAnalizer(data).status).send(responseAnalizer(data).data)
  }
  const deleteItem = async (req, res) => {
    const data = await productDbManager.deleteById(
      parseInt(req.params.id)
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
