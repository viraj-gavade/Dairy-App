const asyncHandler = require('../utils/AsyncHandler')
const CustomApiError =require('../utils/CustomApiErros'
)
const jwt = require('jsonwebtoken')
const USER = require('../Models/users.models')
const VerifyJwt = asyncHandler(async(req,res,next)=>{


   try {
     const token = req.cookies?.accessToken ||  req.header('Authorization')?.replace('Bearer ','')
 
     if(!token){
         throw new CustomApiError(
             401,
             'Unauthorized Request!'
         )
     }
 
     const  decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE)
 
     const user = await USER.findById(decodedToken._id).select('-password')
 
     if(!user){
         throw new CustomApiError(
             401,
             'Inavlid access token!'
         )
     }
 
     req.user = user
     next()
     
   } catch (error) {
    console.log(error)
   }

})

module.exports = VerifyJwt