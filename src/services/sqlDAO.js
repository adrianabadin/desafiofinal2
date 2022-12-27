// const Database = require('../config/knex.js')

const colors = require('colors')
class Products {
  constructor (name, description, code, image, price, stock) {
    this.name = name
    this.description = description
    this.code = code
    this.image = image
    this.price = price
    this.stock = stock
  }
}
class DatabaseHandlder {
  constructor (file, database, table) {
    this.database = new (require('../config/knex.js'))(file, database).database
    this.table = table
    this.products = new Products('string', 'string', 'string', 'string', 'integer', 'integer')
  }

  async isTable () {
    const rta = await this.database.schema.hasTable(this.products).then(() => true).catch(() => false)
    console.log(rta)
    return rta
  }

  async createTable (tableObject) {
    return this.database.schema.createTable(this.table, function (table) {
      const keys = Object.keys(tableObject)
      table.increments('id')
      for (const field of keys) {
        table[tableObject[field]](field)
      }
    }).then(res => { return { status: 201, ok: true, statusText: 'Table created successfully' } }).catch(err => { return { status: 400, ok: false, statusText: 'Failed to create Table', err } })
  }

  async addItem (item) {
    const condicion = await this.isTable()
    if (!condicion) {
      console.log('creatinG table')
      await this.createTable(this.products)
    }
    try {
      console.log(colors.yellow(item))

      const dato = await this.database(this.table).insert(item).then(res=>console.log(res)).catch(err=>console.log(err))

      console.log(this.table, dato)
      return {
        data: [item],
        ok: true,
        err: '',
        status: 200,
        textStatus: 'Item added successfully'
      }
    } catch (e) {
      return {
        data: [],
        ok: false,
        err: e,
        status: 400,
        textStatus: 'Unable to add item in the DB'
      }
    }
  }

  async getByID (id1) {
    const id = parseInt(id1)

    const condicion = await this.isTable()
    if (!condicion) {
      await this.createTable(this.products)
    }
    return this.database(this.table).where({ id }).then(response => {
      return {
        data: JSON.parse(JSON.stringify(response)),
        ok: true,
        err: '',
        status: 200,
        textStatus: 'Element retrived'
      }
    }).catch(e => {
      return {
        data: [],
        ok: false,
        err: '',
        status: 400,
        textStatus: 'Id not found'
      }
    })
  }

  async getAll () {
    const condicion = await this.isTable()
    if (!condicion) {
      await this.createTable(this.products)
    }
    return this.database.select('*').from(this.table).then(response => {
      return {
        data: JSON.parse(JSON.stringify(response)),
        ok: true,
        err: '',
        status: 200,
        textStatus: 'Data retrived'
      }
    }).catch(e => {
      return {
        data: [],
        ok: false,
        err: e,
        status: 400,
        textStatus: 'Couldnt connect to database'
      }
    })
  }

  async updateById (item, id1) {
    const id = parseInt(id1)

    const condicion = await this.isTable()
    if (!condicion) {
      await this.createTable(this.products)
    }

    this.database(this.table).where({ id }).update(item).then(res => {
      return {
        data: JSON.parse(JSON.stringify(item)),
        ok: true,
        err: '',
        status: 200,
        textStatus: 'Item updated successfully'
      }
    }).catch(err => {
      console.error(err)
      return {
        data: [],
        ok: false,
        err,
        status: 400,
        textStatus: 'Unable to update item in the DB'
      }
    })
  }

  async deleteById (id1) {
    const id = parseInt(id1)

    const condicion = await this.isTable()
    if (!condicion) {
      await this.createTable(this.products)
    }
    return this.database(this.table).where({ id }).delete().then(res => {
      if (JSON.parse(JSON.stringify(res)) === 0) throw new Error('Cannot delete')
      return {
        data: [],
        ok: true,
        err: '',
        status: 200,
        textStatus: 'Item deleted successfully'
      }
    }).catch(err => {
      return {
        data: [],
        ok: false,
        err,
        status: 400,
        textStatus: 'Unable to update item in the DB'
      }
    })
  }
}
module.exports = DatabaseHandlder
