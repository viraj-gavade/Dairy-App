// Import required modules
const jwt = require('jsonwebtoken');
const USER = require('../Models/users.models');

// Import utility modules
const asyncHandler = require('../utils/AsyncHandler');
const CustomApiError = require('../utils/CustomApiErros');

/**
 * JWT Authentication Middleware
 * Verifies user access token and attaches user to request object
 * @access Middleware
 */
const VerifyJwt = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = 
            req.cookies?.accessToken || 
            req.header('Authorization')?.replace('Bearer ', '');

        // Redirect to signup if no token is present
        if (!token) {
            return res.redirect('/api/v1/user/signup');
        }

        // Verify token using secret key
        const decodedToken = jwt.verify(
            token, 
            process.env.ACCESS_TOKEN_SECRETE
        );

        // Find user by ID, excluding password
        const user = await USER.findById(decodedToken._id).select('-password');

        // Validate user existence
        if (!user) {
            throw new CustomApiError(
                401,
                'Invalid access token!'
            );
        }

        // Attach user to request object
        req.user = user;

        // Proceed to next middleware
        next();
        
    } catch (error) {
        // Handle different types of authentication errors
        if (error.name === 'JsonWebTokenError') {
            // Invalid token structure
            return res.status(401).redirect('/api/v1/user/signin');
        }

        if (error.name === 'TokenExpiredError') {
            // Expired token
            return res.status(401).redirect('/api/v1/user/signin');
        }

        // For other unexpected errors
        return res.status(500).redirect('/api/v1/user/signin');
    }
});

module.exports = VerifyJwt;