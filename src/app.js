const express=require('express')
const app=express()
const colors= require("colors")
const products=require('./routes/products')
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({extended:true}))
process.env.storage='sqlite'
app.use('/',products)
const server = app.listen(PORT,()=>{
console.log(colors.bgBlue.grey(`Server online on port ${PORT}`))
})
