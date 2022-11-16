const express = require('express')
const bodyParser = require('body-parser')
const route =require("./routes/route.js")

const mongoose = require('mongoose')
const app=express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://DeeptirthaMukherjee:QYKI3k8QSKC4I7FZ@cluster1.khatgm1.mongodb.net/project1-db?retryWrites=true&w=majority",{
useNewUrlParser:true})
.then(()=>console.log("connected"))
.catch(error=>console.log(error))

app.use("/",route)
app.listen(process.env.PORT || 3000 ,function(){
    console.log("running at "+(process.env.PORT || 3000) )
})