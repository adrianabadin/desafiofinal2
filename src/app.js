const express=require('express')
const app=express()
const colors= require("colors")
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const server = app.listen(PORT,()=>{
console.log(colors.bgBlue.grey(`Server online on port ${PORT}`))
})
