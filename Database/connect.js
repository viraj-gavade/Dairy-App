const mongoose = require('mongoose')

const connectdb = async ()=>{
    try {

        return mongoose.connect(process.env.MONGO_URI)

    } catch (error) {
        console.log('Connection Error:-',error)
    }
}

module.exports = mongoose