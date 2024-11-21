const USER = require('../Models/users.models')
const asyncHandler = require('../utils/AsyncHandler')



const SignUpUser = asyncHandler(async(req,res)=>{
    const { email , password , username } = req.body
    console.log(req.body)
})