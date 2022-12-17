const express=require('express')
const router =express.Router()
const productController =require('../controllers/products.controllers')

router.get('/', productController.getItems)
router.get('/:id', productController.getItems)
const validationWare = new ValidatorWare.ValidatorWare('router')
const authVerification = ValidatorWare.authValidation(false)
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


module.exports=router

