const DAIRY = require('../Models/dairy.models')
const asyncHandler = require('../utils/AsyncHandler')
const CustomApiError = require('../utils/CustomApiErros')
const CustomApiResponse = require('../utils/CustomApiResponse')

const CreateDairy = asyncHandler(async(req,res)=>{
    const { title , body , } = req.body
    if(!title || ! body ){
        throw new CustomApiError(
            400,
            'Please provide all the required fields!'
        )
    }

    const Dairy = await DAIRY.create({
        title:title,
        body:body
    })

    const CreatedDairy = await DAIRY.findById(Dairy._id)
    if(!CreatedDairy){
        throw new CustomApiError(
            500,
            'Something Went wrong while creating the dairy!'
        )
    }

    return res.status(200).json(
        new CustomApiResponse(
            200,
            'Dairy created Successfully!',
            CreatedDairy
        )
    )
})

