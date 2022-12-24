const colors = require('colors')
require('../config/mongoose')

class DataResponse {
  constructor (data, ok, err, status, statusText) {
    this.data = data
    this.ok = ok
    this.err = err
    this.status = status
    this.statusText = statusText
  }
}

class DbManager {
  constructor (model) {
    this.model = model
  }

  async getAll () {
    return this.model.find({})
      .then(response => new DataResponse(response, true, '', 200, 'Information retrived'))
      .catch(err => new DataResponse('Failed to get data', false, err, 400, 'Couldnt retrive data'))
  }

  async getById (id) {
    return this.model.findOne({ _id: id })
      .then(response => new DataResponse(response, true, '', 200, 'Information retrived'))
      .catch(err => new DataResponse('ID not found', false, err, 400, 'Couldnt retrive data'))
  }

  async addItem (data) {
    return this.model.create(data)
      .then(response => new DataResponse(response, true, '', 201, 'Information registred'))
      .catch(err => new DataResponse('Imposible to add Item', false, err, 400, 'Couldnt register information'))
  }

  async updateById (data, id) {
    const response = await this.getById(id)
    console.log(colors.bgRed.white(response))
    if (response.ok) {
      return this.model.findByIdAndUpdate(id, data, { new: true })
        .then(response => new DataResponse(response, true, '', 201, 'Information updated'))
        .catch(err => new DataResponse('Failed to update data', false, err, 400, 'Couldnt update information'))
    } else return new DataResponse('ID doesnt exists', false, 'Id Doesnt Exists', 400, 'Couldnt update information')
  }

  async deleteById (id) {
    const response = await this.getById(id)
    if (response.ok) {
      return this.model.deleteOne({ _id: id })
        .then(response => new DataResponse(response, true, '', 201, 'Information deleted'))
        .catch(err => new DataResponse('Failed to delete data', false, err, 400, 'Couldnt delete information'))
    } else return new DataResponse('Document Id doesnt exist', false, 'Id Doesnt exist', 400, 'Couldnt delete information')
  }
}
module.exports = DbManager
