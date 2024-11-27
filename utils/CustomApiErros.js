/**
 * Custom error class for API-related errors with enhanced error handling capabilities
 * Extends the built-in Error class to provide more detailed error information
 */
class CustomApiError extends Error {
    /**
     * Constructs a new CustomApiError instance
     * 
     * @param {number} StatusCode - HTTP status code associated with the error
     * @param {string} [message='Something Went Wrong!'] - Error message (defaults to generic error)
     * @param {Array} [errors=[]] - Additional error details or validation errors
     * @param {string} [stack=''] - Optional custom stack trace
     */
    constructor(
        StatusCode,
        message='Something Went Wrong!',
        errors = [],
        stack=''
    ) {
        // Call parent Error constructor with the message
        super(message)

        // Set error properties
        this.StatusCode = StatusCode,
        this.message = message,
        this.errors = errors,
        this.data = null,
        this.success = false

        // Handle stack trace
        if(stack){
            // Use provided custom stack trace if available
            this.stack = stack
        }
        else{
            // Generate stack trace using Error.captureStackTrace if no custom stack is provided
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

// Export the CustomApiError class for use in other modules
module.exports = CustomApiError