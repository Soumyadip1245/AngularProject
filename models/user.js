const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {type: String,required: true,unique: true},
    account: {type: String,default: "" },
    bankname: {type: String,default: "" },
    ifsccode: {type: String,default: "" },
    branch: {type: String,default: "" },
    accounttype: {type: String,default: "" },

})
module.exports = mongoose.model('User',userSchema)