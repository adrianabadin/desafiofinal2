// import { Color } from "colors";

const fs = require('fs')
const TIMEOUT = 3000

class ItemClass {
  constructor (
    id,
    name,
    description,
    code,
    image,
    price,
    stock
  ) {
    this.id = id
    this.timeStamp = Date.now()
    this.name = name
    this.description = description
    this.code = code
    this.image = image
    this.price = price
    this.stock = stock
  }
}

class CartClass {
  constructor (id, timeStamp, cartProducts) {
    this.id = id
    this.timeStamp = timeStamp
    this.products = cartProducts
  }
}
class VersionClass {
  constructor (timeStamp, blocked, blockStart) {
    this.timeStamp = timeStamp
    this.blocked = blocked
    this.blockStart = blockStart
  }
}
class JsonDbManager {
  constructor (file) {
    this.file = file
    this.data = []
    this.version = new VersionClass(0, false, 0)
  }

  async loadVersion () {
    let version
    if (fs.existsSync(`${this.file}.version`)) {
      version = await JSON.parse(
        await fs.promises.readFile(`${this.file}.version`, 'utf-8')
      )
      console.log(version)
    } else {
      version = new VersionClass(Date.now(), false, 0)
      await fs.promises.writeFile(
        `${this.file}.version`,
        JSON.stringify(version),
        'utf-8'
      )
    }
    return version
  }

  async versionCompare () {
    const objectVersion = this.version
    const dbVersion = await this.loadVersion()
    if (dbVersion.timeStamp !== objectVersion.timeStamp) {
      return false
    } else return true
  }

  async updateVersion (block) {
    if (block) this.version = new VersionClass(Date.now(), true, Date.now())
    else this.version = new VersionClass(Date.now(), false, 0)
    fs.promises.writeFile(
      `${this.file}.version`,
      JSON.stringify(this.version),
      'utf-8'
    )
  }

  async readData () {
    if (!(await this.versionCompare())) {
      // eslint-disable-next-line no-extra-boolean-cast
      if (Boolean(fs.existsSync(`${this.file}.JSONE`))) {
        this.data = await JSON.parse(
          `[${await fs.promises.readFile(`${this.file}.JSONE`, 'utf-8')}]`
        )
      } else {
        const jsonMod = JSON.stringify(this.data).slice(
          1,
          this.data.length - 1
        )
        fs.promises.writeFile(`${this.file}.JSONE`, jsonMod, 'utf-8')
        this.updateVersion(false)
      }
    }
    return this.data
  }

  async saveFile () {
    while ((await this.loadVersion()).blocked) {
      console.log('DataStorage blocked')
      setTimeout(async () => await this.updateVersion(false), TIMEOUT)
    }
    await this.updateVersion(true)
    const jsonEdited = JSON.stringify(this.data).slice(1, -1)
    await fs.promises.writeFile(`${this.file}.JSONE`, jsonEdited, 'utf-8')
    await this.updateVersion(false)
  }

  largestId () {
    let id
    if (Boolean(fs.existsSync(`${this.file}.JSONE`)) && this.data.length > 0) {
      id = Math.max(...this.data.map((item) => item.id)) + 1
    } else id = 0
    return id
  }

  async appendItem (item) {
    setTimeout(async () => await this.updateVersion(false), TIMEOUT)
    while ((await this.loadVersion()).blocked) {
      console.log('DataStorage blocked')
    }
    await this.updateVersion(true)
    try {
      fs.promises.appendFile(`${this.file}.JSONE`, item)
    } catch (err) {
      console.log(err)
    }
    await this.updateVersion(false)
  }

  async addItem (item) {
    await this.readData()
    let response
    const itemUpdated = { ...item, id: this.largestId() }
    this.data.push(itemUpdated)
    try {
      if (this.data.length > 1) {
        await this.appendItem(',' + JSON.stringify(itemUpdated))
      } else await this.appendItem(JSON.stringify(itemUpdated))
      response = {
        data: [itemUpdated],
        ok: true,
        err: '',
        status: 200,
        textStatus: 'Element updated'
      }
    } catch (e) {
      response = {
        data: [],
        ok: false,
        err: 'Unable to write in the DB',
        status: 400,
        textStatus: ''
      }
    }
    return response
  }

  async getById (id1) {
    const id = parseInt(id1)
    await this.readData()
    const response = await this.data.filter((item) => item.id === id)
    return response.length === 0
      ? {
          data: [],
          textStatus: '',
          err: 'The id does not exist',
          status: 403,
          ok: false
        }
      : {
          data: response[0],
          textStatus: 'Element found',
          err: ' ',
          status: 200,
          ok: true
        }
  }

  async getAll () {
    await this.readData()
    return this.data.length > 0
      ? {
          data: this.data,
          ok: true,
          err: '',
          status: 200,
          textStatus: 'Get All elements Fullfiled'
        }
      : {
          data: [],
          ok: true,
          textStatus: 'No data contained',
          status: 403,
          err: ''
        }
  }

  async deleteById (id1) {
    const id = parseInt(id1)
    console.log('Deletingid :', id)
    await this.readData()
    const item = this.data.find((dataItem) => dataItem.id === id)
    if (item != null) {
      this.data = this.data.filter((item) => item.id !== id)
      await this.saveFile()
      return {
        data: [item],
        ok: true,
        err: '',
        status: 200,
        textStatus: 'Element Deleted'
      }
    } else {
      return {
        data: [],
        ok: false,
        err: 'The id does not exist',
        status: 400,
        textStatus: 'The id does not exist'
      }
    }
  }

  async updateById (item, id1) {
    const id = parseInt(id1)

    await this.readData()
    const dataIndex = this.data.findIndex((dataItem) => dataItem.id === id)
    if (dataIndex !== -1) {
      this.data[dataIndex] = item
      await this.saveFile()
      return {
        data: [item],
        ok: true,
        err: '',
        status: 200,
        textStatus: 'Successyfull update'
      }
    } else {
      return {
        data: [],
        ok: false,
        err: 'The Id doesnt exist',
        status: 400,
        textStatus: 'The Id doesnt exist'
      }
    }
  }
}

module.exports = { JsonDbManager, ItemClass, CartClass }
