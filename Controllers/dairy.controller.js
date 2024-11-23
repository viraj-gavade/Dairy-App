const DAIRY = require('../Models/dairy.models')
const asyncHandler = require('../utils/AsyncHandler')
const CustomApiError = require('../utils/CustomApiErros')
const CustomApiResponse = require('../utils/CustomApiResponse')

const CreateDairy = asyncHandler(async(req,res)=>{
    const { title , body  } = req.body
    console.log(req.body)
    if(!title || ! body ){
        throw new CustomApiError(
            400,
            'Please provide all the required fields!'
        )
    }

    const Dairy = await DAIRY.create({
        title:title,
        body:body,
        createdBy:req.user
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


const UpdateDairy = asyncHandler(async(req,res)=>{
    const { id } = req.params
    const { title , body } = req.body
    const Dairy = await DAIRY.findByIdAndUpdate(id,{
        title:title,
        body:body 
    })
    if(!Dairy){
        throw new CustomApiError(
            500,
            'There is no such dairy with id :',id
        )
    }
    
    return res.status(200).json(
        new CustomApiResponse(
            200,
            'Dairy Updated Successfully!',
                Dairy
            
        )
    )
})

const DeleteDairy = asyncHandler(async(req,res)=>{
    const { id } = req.params
    const Dairy = await DAIRY.findByIdAndDelete(id)
    if(!Dairy){
        throw new CustomApiError(
            500,
            'There is no such dairy with id :',id
        )
    }
    
    return res.status(200).json(
        new CustomApiResponse(
            200,
            'Dairy Deleted Successfully!', 
        )
    )
})

const GetSingleDairy = asyncHandler(async(req,res)=>{
    const { id } = req.params
    const diary = await DAIRY.findById(id)
    console.log(dairy)
    res.render('singledairy',{
        diary:diary
    })


})



module.exports = {
    CreateDairy,
    DeleteDairy,
    UpdateDairy,
    GetSingleDairy
}