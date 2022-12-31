require('dotenv').config()
const choice = process.env.choice
const colors = require('colors')
const strategyObject = {
  sqlite: (param) => {
    console.log(colors.bold.bgGreen.white('Database: SQLite'))
    if (param === 'products') {
      return new (require('../services/sqlDAO'))('products', 'sqlite', 'products')
    } else {
      return new (require('../services/sqlDAO'))('carts', 'sqlite', 'carts')
    }
  },
  mongo: param => {
    console.log(colors.bold.bgGreen.white('Database: Mongo'))
    if (param === 'products') {
      return new (require('../services/mongoDbDAO'))(require('../databases/models/productsModel').Products)
    } else return new (require('../services/mongoDbDAO'))(require('../databases/models/cartModels'))
  },
  json: param => {
    console.log(colors.bold.bgGreen.white('Database: Json Database'))
    return new (require('../services/jsonDAO').JsonDbManager)(param)
  },
  firebase: param => {
    console.log(colors.bold.bgGreen.white('Database: Firebase'))
    return new (require('../services/firestoreDAO'))(param)
  }
}

class DbManager {
  static instance
  constructor (param) {
    if (typeof DbManager.instance === 'object') {
      return this.instance
    }
    if (choice in strategyObject) {
      this.database = strategyObject[choice](param)
    } else console.log('Not supported database')

    DbManager.instance = this
  }
}

module.exports = DbManager
