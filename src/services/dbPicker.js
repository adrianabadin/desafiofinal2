/* eslint-disable no-sequences */
require('dotenv').config()
const choice = process.env.choice
const colors = require('colors')
/*
sqlite param ={file,database,table}
process.env.choice
*/
function databaseChoiceHandler (param) {
  switch (choice) {
    case 'sqlite':
    {
      console.log(colors.bold.bgGreen.white('Database: SQLite'))
      if (param === 'products') {
        return new (require('../services/sqlDAO'))('products', 'sqlite', 'products')
      } else return new (require('../services/sqlDAO'))('carts', 'sqlite', 'carts') }
    case 'mongo':{
      console.log(colors.bold.bgGreen.white('Database: Mongo'))
      if (param === 'products') {
        const model = require('../databases/models/productsModel').Products
        const response = new (require('../services/mongoDbDAO'))(model)
        return response
      } else return new (require('../services/mongoDbDAO'))(require('../databases/models/cartModels'))
    }
    case 'json':
      console.log(colors.bold.bgGreen.white('Database: Json Database'))
      return new (require('../services/jsonDAO').JsonDbManager)(param)
    case 'firebase':
      console.log(colors.bold.bgGreen.white('Database: Firebase'))
      return new (require('../services/firestoreDAO'))(param)
    default:
      console.log('No database selected')
  }
}

class DbManager {
  constructor (param) {
    this.database = (databaseChoiceHandler(param))//
  }
}

module.exports = DbManager
