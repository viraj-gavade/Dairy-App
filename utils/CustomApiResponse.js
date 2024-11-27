/**
 * Standardized API response class for consistent response formatting
 * Automatically determines success status based on HTTP status code
 */
class ApiResponse {
    /**
     * Constructs a new API response object
     * 
     * @param {number} statusCode - HTTP status code of the response
     * @param {string} [message='success'] - Response message (defaults to 'success')
     * @param {*} [data] - Optional data payload to be sent with the response
     */
    constructor(statusCode, message='success', data){
        // Set status code
        this.statusCode = statusCode,
        // Set response message
        this.message = message,
        // Set response data
        this.data = data,
        // Determine success status (true for status codes < 400)
        this.success = statusCode < 400
    }
}

// Export the ApiResponse class for use in other modules
module.exports = ApiResponse