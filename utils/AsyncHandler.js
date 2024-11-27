/**
* Async Error Handling Middleware
* Wraps async route handlers to catch and forward errors
* 
* @param {Function} fn - Async route handler function
* @returns {Function} Middleware function
*/
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch((err) => next(err))
    }
 }
 
 module.exports = asyncHandler