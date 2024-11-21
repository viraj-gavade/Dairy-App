const USER = require('../Models/users.models')
const asyncHandler = require('../utils/AsyncHandler')
const CustomApiError = require('../utils/CustomApiErros')
const CustomApiResponse = require('../utils/CustomApiResponse')



const SignUpUser = asyncHandler(async(req,res)=>{
    const { email , password , username } = req.body
    console.log(req.body)
    const emailCheck = await USER.findOne({
        email:email
      })
      if(emailCheck){
        throw new CustomApiError(
            400,
            'User with this email already exists! '
        )
      }
      const usernameCheck = await USER.findOne({
        username:username
      })
      if(usernameCheck){
        throw new CustomApiError(
            400,
            'User with this username already exists! '
        )
      }
      const CreateUser = await USER.create({
        username:username,
        email:email,
        password
      })

      const FindUser = await USER.findById(CreateUser._id).select('-password')
      if(!FindUser){
        throw new CustomApiError(
            400,
            'Something went wrong while creating the user'
        )
      }

      return res.status(200).json(
        new CustomApiResponse(
            200,
            'User Created Successfully!',
            FindUser
        )
      )
})