// Import required module
const mongoose = require('mongoose');

/**
 * Diary Schema Definition
 * Represents a user's diary entry with title, body, and creation metadata
 */
const DiarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Diary title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    body: {
        type: String,
        required: [true, 'Diary content is required'],
        trim: true,
       
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: [true, 'Diary must be associated with a user']
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    
    // Additional schema options
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Optional: Add a text index for search functionality
DiarySchema.index({ title: 'text', body: 'text' });

// Optional: Add a virtual to get diary entry length
DiarySchema.virtual('entryLength').get(function() {
    return this.body.length;
});

// Optional: Add a pre-save hook for validation or transformation
DiarySchema.pre('save', function(next) {
    // Example: Trim excessive whitespace
    this.title = this.title.trim();
    this.body = this.body.trim();
    next();
});

// Create and export the Diary model
module.exports = mongoose.model('Dairy', DiarySchema);