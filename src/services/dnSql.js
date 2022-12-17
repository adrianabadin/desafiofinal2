// const Database = require('../config/knex')
class DatabaseHanlder {
  constructor (database, table, model) {
    this.database = database
    this.table = table
    this.model = model
    this.products = {
      name: 'string',
      description: 'string',
      code: 'string',
      image: 'string',
      price: 'number',
      stock: 'number'
    }
  }

  async isTable () {
    return (await this.database.schema.hasTable(this.table))
  }

  async createTable (tableObject) {
    await this.database.schema.createTable(this.table, function (table) {
      Object.keys(tableObject).forEach(field => {
        table[tableObject[field]](field)
      })
    })
  }
}
module.exports = DatabaseHanlder
