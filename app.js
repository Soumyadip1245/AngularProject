var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.port||8080
const path = require('path')
const Mean = require('./routes/usercontroller')
var mongoose = require('mongoose')
var cors = require('cors')
const router = require('./routes/usercontroller')

mongoose.connect('mongodb+srv://Soumyadip:20csu214@cluster0.jm2zckm.mongodb.net/AngularProject?retryWrites=true&w=majority').then(()=>{
    console.log("Database Connected")
}).catch((e)=>{
    console.log(e)
})
app.use(cors())
app.use(bodyParser.json())
app.use('/mean',Mean)
app.get('/',(req,res)=>{
    res.send("Backend Working")
})
app.listen(port,()=>{
    console.warn(`Server Running At Port: `+port)
})