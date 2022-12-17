const colors = require('colors')
class ValidatorWare {
  SelectionObject
  ValidationObject = {
    name: /[a-zA-Z0-9]{3,}/g,
    description: /[a-zA-Z0-9]{3,}/g,
    price: /[0-9]/,
    stock: /[0-9]/,
    code: /[0-9A-Za-z]/
  }

  constructor (selectedObject) {
    this.selectedObject = selectedObject
  }

  validation = (req, res, next) => {
    let validationObject
    const data = req.body
    if (req.body === undefined) {
      res.status(400).send({
        data: [],
        ok: false,
        err: 'Data doesnt validate',
        status: 400,
        textStatus: 'Data doesnt validate'
      })
    }
    if (this.selectedObject === 'PRODUCTS') validationObject = this.ValidationObject
    else next()
    const dataKeys = Object.keys(data)
    const validationKeys = Object.keys(validationObject)
    const result = []
    dataKeys.forEach((item) => {
      if (validationKeys.includes(item)) {
        const expression = new RegExp(
          validationObject[item]
        )
        console.log(colors.red(item))
        result.push(expression.test(data[item].toString()))
      } else result.push(true)
    })
    console.log(result)
    if (!result.includes(false)) next()
    else {
      res.status(400).send({
        data: [],
        ok: false,
        err: 'Data doesnt validate',
        status: 400,
        textStatus: 'Data doesnt validate'
      })
    }
  }
}

function authValidation (status) {
  const authVal = (req, res, next) => {
    if (status) next()
    else {
      res.status(401).send({
        data: [],
        ok: false,
        err: `${req.path} x método ${req.method} no autorizada`,
        status: 401,
        textStatus: ''
      })
    }
  }
  return { authVal }
}
module.exports = { ValidatorWare, authValidation }
