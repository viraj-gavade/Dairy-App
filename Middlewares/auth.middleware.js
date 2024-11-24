const asyncHandler = require('../utils/AsyncHandler')
const CustomApiError =require('../utils/CustomApiErros'
)
const jwt = require('jsonwebtoken')
const USER = require('../Models/users.models')
const VerifyJwt = asyncHandler(async(req,res,next)=>{

   try {
    console.log(req.cookies)
    const token = req.cookies?.accessToken ||  req.header('Authorization')?.replace('Bearer ','')
    console.log(token)
 
     if(!token){
       return res.redirect('/api/v1/user/signup')
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