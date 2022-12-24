const mongoose = require('mongoose')
const colors = require('colors')
const url = 'mongodb+srv://dcsweb:1234@dcsweb.snm3hyr.mongodb.net/?retryWrites=true&w=majority'
const dbConnect = async () => {
  mongoose.set('strictQuery', true)
  return mongoose.connect(url)
}
dbConnect()
  .then(() => {
    console.log(colors.green(`Connected to ${url}`))
  })
  .catch(err => console.log(colors.red(err)))

mongoose.connection
  .on('error', err => console.log(colors.bgRed.white.bold('There is an error:'), err))
  .once('close', () => console.log(colors.green('Connection terminated')))
