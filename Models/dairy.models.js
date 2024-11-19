const mongoose = require('mongoose')

const DiarySchema = new mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Dairy',DiarySchema)