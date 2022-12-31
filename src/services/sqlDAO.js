const colors = require('colors')

class DatabaseHandlder {
  constructor (file, database, table) {
    this.database = new (require('../config/knex.js'))(file, database).database
    this.table = table
    this.products = (table === 'products') ? { name: 'string', description: 'string', code: 'string', image: 'string', price: 'integer', stock: 'integer', timeStamp: 'integer' } : { timeStamp: 'integer', products: 'json' }
  }

  async isTable () {
    const rta = await this.database.schema.hasTable(this.table).then((response) => {
      return response
    }).catch((response) => {
      return response
    })
    return rta
  }

  async createTable (tableObject) {
    return this.database.schema.createTable(this.table, function (table) {
      const keys = Object.keys(tableObject)
      table.increments('id')
      keys.forEach((key) => {
        table[tableObject[key]](key)
      })
    }).then(res => {
      return { status: 201, ok: true, statusText: 'Table created successfully' }
    }).catch(err => {
      console.log(err)
      return { status: 400, ok: false, statusText: 'Failed to create Table', err }
    })
  }

  async addItem (item1) {
    const item = { ...item1, id: undefined }

    const condicion = await this.isTable()
    if (!condicion) {
      await this.createTable(this.products)
    }

    try {
      await this.database(this.table).insert(item).then(res => console.log(res)).catch(err => console.log(err))

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

  async getById (id1) {
    const id = parseInt(id1)

    const condicion = await this.isTable()
    if (!condicion) {
      await this.createTable(this.products)
    }
    return this.database(this.table).where({ id }).then(response => {
      if (response.length !== 0) {
        return {
          data: JSON.parse(JSON.stringify(response)),
          ok: true,
          err: '',
          status: 200,
          textStatus: 'Element retrived'
        }
      } else throw new Error('Element not found')
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

  isCart (item) {
    let response = false
    if (('products' in item) && ('timeStamp' in item)) {
      response = true
    }
    return response
  }

  async updateById (item1, id1) {
    const id = parseInt(id1)
    const item = (Array.isArray(item1)) ? { ...item1[0], id } : { ...item1, id }
    if ('products' in item) {
      item.products = JSON.stringify(item1.products)
    }
    const condicion = await this.isTable(this.table)
    console.log(colors.yellow(item.products), 'ada', colors.green(item1))
    if (!condicion) {
      await this.createTable(this.products)
    }

    return await this.database(this.table).where({ id }).update(item).then(res => {
      if (res !== 0) {
        return {
          data: JSON.parse(JSON.stringify(item)),
          ok: true,
          err: '',
          status: 200,
          textStatus: 'Item updated successfully'
        }
      } else throw new Error('Item not updated')
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
        textStatus: 'Unable to delete item in the DB'
      }
    })
  }
}
module.exports = DatabaseHandlder
