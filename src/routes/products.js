const express = require('express')
const router = express.Router()
const productController = require('../controllers/products.controllers')
const ValidatorWare = require('../services/validation').ValidatorWare
const authValidation = require('../services/validation').authValidation
router.get('/', productController.getItems)
router.get('/:id', productController.getItems)
const validationWare = new ValidatorWare('PRODUCTS')
const authVerification = authValidation(true)
router.post(
  '/',
  authVerification.authVal,
  validationWare.validation,
  productController.postItem
)
router.put(
  '/:id',
  authVerification.authVal,
  validationWare.validation,
  productController.updateItem
)
router.delete('/:id', authVerification.authVal, productController.deleteItem)

module.exports = router
