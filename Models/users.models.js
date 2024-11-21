const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

UserSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        return next()
    }

    const salt = await bcryptjs.genSalt(16)
    this.password = await bcryptjs.hash(this.password,salt)
    next() 
})
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password,this.password)
}

UserSchema.methods.CreateAccessToken = async function (params) {
    
    const paylod = {
        _id:this._id,
        username:this.username
    }

    const AccessToken = await jwt.sign(paylod,process.env.ACCESS_TOKEN_SECRETE)

    return AccessToken
}



module.exports = mongoose.model('User',UserSchema)