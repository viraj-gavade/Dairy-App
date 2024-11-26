const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// User Schema Definition
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    password: {
        type: String,
        required: [false, 'Password is not required!']
    }
})

// Pre-save middleware to hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcryptjs.genSalt(16)
    this.password = await bcryptjs.hash(this.password, salt)
    next() 
})

// Method to check password correctness
UserSchema.methods.isPasswordCorrect = async function(password) {
    return await bcryptjs.compare(password, this.password)
}

// Method to create access token
UserSchema.methods.CreateAccessToken = async function () {
    const paylod = {
        _id: this._id,
        username: this.username
    }

    const AccessToken = await jwt.sign(paylod, process.env.ACCESS_TOKEN_SECRETE)

    return AccessToken
}

module.exports = mongoose.model('User', UserSchema)