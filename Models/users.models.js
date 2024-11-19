const mongoose = require('mongoose')


const UserSchema = new  mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required!']
    },
    email:{
        type:String,
        required:[true,'Email is required!']
    },
    password:{
        type:String,
        required:[false,'Password is not required!']
    }
})


module.exports = mongoose.model('User',UserSchema)