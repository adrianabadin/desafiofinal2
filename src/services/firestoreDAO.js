class DataResponse {
  constructor (data, ok, err, status, statusText) {
    this.data = data
    this.ok = ok
    this.err = err
    this.status = status
    this.statusText = statusText
  }
}

class FirebaseManager {
  constructor (colection) {
    this.collection = colection
    this.db = require('../config/firestore').firestore()
  }

  async getAll () {
    return this.db.collection(this.collection).get({})
      .then((response) => {
        const array = []
        response.forEach((item) => {
          array.push({ ...item.data(), id: item.id })
        })
        return new DataResponse(array, true, '', 200, 'Succesifully retrived data')
      })
      .catch((err) => new DataResponse([], false, err, 400, 'Error couldnt retrive data'))
  }

  async getById (id) {
    const result = await this.db.collection(this.collection).doc(id).get()
    let response
    if (result.exists) {
      response = new DataResponse({ ...result.data(), id: result.id }, true, '', 200, 'Succesfully retrived data')
    } else response = new DataResponse({ ...result.data(), id: result.id }, false, 'Document doesnt exist', 400, 'Document doesnt exist')
    return response
  }

  async addItem (data1) {
    const data = JSON.parse(JSON.stringify(data1))
    console.log(data, 'data')
    return this.db.collection(this.collection).add(data)
      .then((response) => {
        console.log(response.id)
        return new DataResponse({ ...data, id: response.id }, true, '', 201, `Product added successfully ${response}`)
      }).catch((err) => new DataResponse([], false, err, 400, 'Error couldnt add Item'))
  }

  async updateById (data, id) {
    return this.db.collection(this.collection).doc(id).update(JSON.parse(JSON.stringify(data)))
      .then((response) => {
        return new DataResponse({ ...data, id: response }, true, '', 200, 'Product updated successfully')
      }).catch(err => new DataResponse([], false, err, 400, 'Error couldnt update Item'))
  }

  async deleteById (id) {
    const doc = this.db.collection(this.collection).doc(id)
    const result = await doc.get()
    if (result.exists) {
      return doc.delete()
        .then((response) => {
          return new DataResponse({ ...result.data(), id: result.id }, true, '', 200, 'Product deleted successfully')
        }).catch(err => new DataResponse([], false, err, 400, 'Error couldnt delete Item'))
    } else return new DataResponse([], false, 'Id doesnt exists', 400, 'Id doesnt exists')
  }
}

module.exports = FirebaseManager
