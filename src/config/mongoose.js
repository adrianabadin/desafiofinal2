require('dotenv').config()
const mongoose = require('mongoose')
const colors = require('colors')
const url = process.env.MONGO_URL1 + process.env.MONGO_PASS + process.env.MONGO_URL2
const dbConnect = async () => {
  mongoose.set('strictQuery', true)
  return mongoose.connect(url)
}
dbConnect()
  .then(() => {
    console.log(colors.green(`Connected to ${process.env.MONGO_URL1}<password>${process.env.MONGO_URL2}`))
  })
  .catch(err => console.log(colors.red(err)))

mongoose.connection
  .on('error', err => console.log(colors.bgRed.white.bold('There is an error:'), colors.cyan(err)))
  .once('close', () => console.log(colors.green('Connection terminated')))
