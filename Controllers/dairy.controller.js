const DAIRY = require('../Models/dairy.models')
const asyncHandler = require('../utils/AsyncHandler')
const CustomApiError = require('../utils/CustomApiErros')
const CustomApiResponse = require('../utils/CustomApiResponse')
const User = require('../Models/users.models')
const mongoose = require('mongoose')

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
    console.log(diary)
    res.render('singledairy',{
        diary:diary,
        user:req.user
    })


})

const MyDiaries = asyncHandler(async(req,res)=>{
    console.log(req.user)
    const diary = await User.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"dairies",
                localField:'_id',
                foreignField:'createdBy',
                as:"MyDairies",
            },
            
        },
       
    ])

    console.log(diary)

    return res.status(200).render('',{
        diary:diary,
        user:req.user
    })
})

module.exports = {
    CreateDairy,
    DeleteDairy,
    UpdateDairy,
    GetSingleDairy,
    MyDiaries
}