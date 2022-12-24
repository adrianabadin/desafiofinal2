
const admin = require('firebase-admin')

const serviceAccount = require('./coderhouse-9b92e-firebase-adminsdk-0tt4g-20abc15aec.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
module.exports = admin
