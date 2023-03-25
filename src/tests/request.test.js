/* eslint-disable no-undef */
const axios = require('axios').default
require('dotenv').config()
const url = `http://localhost:${process.env.PORT}`
test('Testing get request de products en localhost:puerto/', async () => {
  const response = await axios.get(url)
  expect(response.data.ok).toBe(true)
  expect(response.data.status).toBe(200)
  expect(Array.isArray(response.data.data)).toBe(true)
})
test('Should return response.data.ok True on postItem', async () => {
  const product = {
    name: 'Product Name',
    description: 'Product Description',
    code: '12345',
    image: 'https://example.com/product.png',
    price: 9.99,
    stock: 100
  }
  const response = await axios.post(url, product)
  expect(response.data.ok).toBe(true)
  expect(response.data.status).toBe(201)
})

test('Should return response.data.ok true on Update Product', async () => {
  const product = {
    name: 'Product Name',
    description: 'Product Description',
    code: '12345',
    image: 'https://example.com/product.png',
    price: 9.99,
    stock: 100
  }
  const id = '641f5b686ff76801e63a4cb0'
  const response = await axios.put(url + '/' + id, product)
  expect(response.data.ok).toBe(true)
  expect(response.data.status).toBe(201)
})
test('delete Route should give status 400 and response.data.ok = false when passing an inexistent  ID ', async () => {
  const id = '1'
  try {
    const response = await axios.delete(url + '/' + id)
    expect(response.data.ok).toBe(false)
    expect(response.data.status).toBe(400)
  } catch (e) { console.log(e) }
})
