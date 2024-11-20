const mongoose = require('mongoose')

const DiarySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Dairy',DiarySchema)