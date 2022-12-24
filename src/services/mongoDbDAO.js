require('../config/mongoose')
class DbManager {
  constructor (model) {
    this.model = require('../databases/models/productsModel')
  }

  async getAll () {
    return await this.model.find({})
  }

  async getById (id) {
    return await this.model.findOne({ _id: id })
  }

  async addItem (data) {
    return await this.model.create(data)
  }

  async updateById (id, data) {
    return await this.model.findByIdAndUpdate(id, data)
  }

  async deleteById (id) {
    return await this.model.deleteOne({ _id: id })
  }
}
module.exports = DbManager
