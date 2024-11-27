// Import required modules
const DAIRY = require('../Models/dairy.models');
const User = require('../Models/users.models');
const mongoose = require('mongoose');

// Import utility modules
const asyncHandler = require('../utils/AsyncHandler');
const CustomApiError = require('../utils/CustomApiErros');
const CustomApiResponse = require('../utils/CustomApiResponse');

/**
 * Create a new dairy entry
 * @route POST /api/v1/dairy
 * @access Private
 */
const CreateDairy = asyncHandler(async (req, res) => {
    // Destructure request body
    const { title, body } = req.body;

    // Validate required fields
    if (!title || !body) {
        throw new CustomApiError(
            400,
            'Please provide all the required fields!'
        );
    }

    // Create dairy entry
    const Dairy = await DAIRY.create({
        title: title,
        body: body,
        createdBy: req.user
    });

    // Verify dairy creation
    const CreatedDairy = await DAIRY.findById(Dairy._id);
    if (!CreatedDairy) {
        throw new CustomApiError(
            500,
            'Something Went wrong while creating the dairy!'
        );
    }
    

    // Return successful response
    return res.status(200).json(
        new CustomApiResponse(
            200,
            'Dairy created Successfully!',
            CreatedDairy
        )
    );
});

/**
 * Update an existing dairy entry
 * @route PUT /api/v1/dairy/:id
 * @access Private
 */
const UpdateDairy = asyncHandler(async (req, res) => {
    // Extract diary ID from request parameters
    const { id } = req.params;
    const { title, body } = req.body;

    // Update dairy entry
    const Dairy = await DAIRY.findByIdAndUpdate(id, {
        title: title,
        body: body 
    }, { new: true }); // Added { new: true } to return updated document

    // Validate dairy existence
    if (!Dairy) {
        throw new CustomApiError(
            404, // Changed to 404 for resource not found
            `There is no such dairy with id: ${id}`
        );
    }
    
    // Return successful response
    return res.status(200).json(
        new CustomApiResponse(
            200,
            'Dairy Updated Successfully!',
            Dairy
        )
    );
});

/**
 * Delete a dairy entry
 * @route DELETE /api/v1/dairy/:id
 * @access Private
 */
const DeleteDairy = asyncHandler(async (req, res) => {
    // Extract diary ID from request parameters
    const { id } = req.params;

    // Delete dairy entry
    const Dairy = await DAIRY.findByIdAndDelete(id);

    // Validate dairy existence
    if (!Dairy) {
        throw new CustomApiError(
            404, // Changed to 404 for resource not found
            `There is no such dairy with id: ${id}`
        );
    }
    
    // Return successful response
    return res.status(200).json(
        new CustomApiResponse(
            200,
            'Dairy Deleted Successfully!'
        )
    );
});

/**
 * Retrieve a single dairy entry
 * @route GET /api/v1/dairy/:id
 * @access Private
 */
const GetSingleDairy = asyncHandler(async (req, res) => {
    // Extract diary ID from request parameters
    const { id } = req.params;

    // Fetch single diary entry
    const diary = await DAIRY.findById(id);

    // Render single dairy view
    res.render('singledairy', {
        diary: diary,
        user: req.user
    });
});

/**
 * Retrieve user's diaries using aggregation
 * @route GET /api/v1/my-diaries
 * @access Private
 */
const MyDiaries = asyncHandler(async (req, res) => {
    // Fetch user's diaries using MongoDB aggregation
    const diary = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "dairies",
                localField: '_id',
                foreignField: 'createdBy',
                as: "MyDairies",
            },
        },
    ]);

    // Render my diaries view
    return res.status(200).render('my-diaries', {
        diary: diary,
        user: req.user
    });
});

module.exports = {
    CreateDairy,
    DeleteDairy,
    UpdateDairy,
    GetSingleDairy,
    MyDiaries
};